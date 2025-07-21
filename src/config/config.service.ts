import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Centralized config keys
export enum ConfigKey {
  JwtSecret = 'JWT_SECRET',
  RateLimitWindowMs = 'RATE_LIMIT_WINDOW_MS',
  RateLimitMaxRequests = 'RATE_LIMIT_MAX_REQUESTS',
  NodeEnv = 'NODE_ENV',
}

// Environment separation
const envFile = `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

/**
 * ConfigService provides access to environment variables and config values.
 *
 * Required keys:
 * - JWT_SECRET: string
 * - RATE_LIMIT_WINDOW_MS: number (optional, default: 60000)
 * - RATE_LIMIT_MAX_REQUESTS: number (optional, default: 30)
 * - NODE_ENV: string (optional)
 */
@Injectable()
export class ConfigService {
  // Cache for config values
  private cache: Record<string, string> = {};

  get(key: string): string | undefined {
    if (this.cache[key]) return this.cache[key];
    const value = process.env[key];
    if (value) this.cache[key] = value;
    return value;
  }

  getJwtSecret(): string {
    const secret = this.get(ConfigKey.JwtSecret);
    if (!secret) {
      throw new Error('JWT_SECRET is required in environment config');
    }
    return secret;
  }

  getRateLimitWindowMs(): number {
    const val = this.get(ConfigKey.RateLimitWindowMs);
    return val ? Number(val) : 60000;
  }

  getRateLimitMaxRequests(): number {
    const val = this.get(ConfigKey.RateLimitMaxRequests);
    return val ? Number(val) : 30;
  }

  getNodeEnv(): string {
    return this.get(ConfigKey.NodeEnv) || 'development';
  }
}
