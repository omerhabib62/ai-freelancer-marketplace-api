import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client;

    constructor(private configService: ConfigService) {
        this.client = createClient({
            url: `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`,
        });

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    async onModuleInit() {
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.disconnect();
    }

    // Session methods
    async createSession(userId: number, data: any, ttl = 86400): Promise<string> {
        const sessionId = `session:${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        const sessionKey = `user:${userId}:session:${sessionId}`;

        await this.client.set(sessionKey, JSON.stringify({
            userId,
            createdAt: new Date(),
            ...data
        }));
        await this.client.expire(sessionKey, ttl);

        // Also store session reference in user's active sessions
        await this.client.sAdd(`user:${userId}:sessions`, sessionId);

        return sessionId;
    }

    async getSession(sessionId: string): Promise<any> {
        // Get userId from sessionId format
        const userId = sessionId.split(':')[1];
        const sessionKey = `user:${userId}:session:${sessionId}`;

        const data = await this.client.get(sessionKey);
        return data ? JSON.parse(data) : null;
    }

    async deleteSession(userId: number, sessionId: string): Promise<void> {
        const sessionKey = `user:${userId}:session:${sessionId}`;
        await this.client.del(sessionKey);
        await this.client.sRem(`user:${userId}:sessions`, sessionId);
    }

    async deleteAllUserSessions(userId: number): Promise<number> {
        const sessionIds = await this.client.sMembers(`user:${userId}:sessions`);
        let count = 0;

        for (const sessionId of sessionIds) {
            const sessionKey = `user:${userId}:session:${sessionId}`;
            await this.client.del(sessionKey);
            count++;
        }

        // Clear the set of session IDs
        await this.client.del(`user:${userId}:sessions`);

        return count;
    }

    async getAllUserSessions(userId: number): Promise<any[]> {
        const sessionIds = await this.client.sMembers(`user:${userId}:sessions`);
        const sessions = [];

        for (const sessionId of sessionIds) {
            const data = await this.getSession(sessionId);
            if (data) {
                sessions.push({ sessionId, ...data });
            }
        }

        return sessions;
    }
}