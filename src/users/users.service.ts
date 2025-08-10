import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from '../common/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private users = [];
  private idCounter = 1;

  findAll() {
    return this.users;
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string, relations: string[] = []) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      relations,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.role as UserRole,
    });
    return this.userRepository.save(user);
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

  findAllUsers() {
    return this.userRepository.findOne({});
  }
}
