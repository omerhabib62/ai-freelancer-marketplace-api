import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum UserRole {
  FREELANCER = 'freelancer',
  CLIENT = 'client',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.FREELANCER,
  })
  role: UserRole;

  @Column({ nullable: true })
  bio: string;

  @Column('simple-array', { nullable: true })
  skills: string[];
}
