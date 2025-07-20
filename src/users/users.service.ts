import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];
  private idCounter = 1;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  create(user: any) {
    const newUser = { ...user, id: this.idCounter++ };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, update: any) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...update };
    return this.users[idx];
  }

  remove(id: number) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    const removed = this.users.splice(idx, 1);
    return removed[0];
  }
}
