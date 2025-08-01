import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Freelancer } from './freelancer.entity';
import { Client } from './client.entity';
import { Log } from './log.entity';

export enum UserRole {
  FREELANCER = 'freelancer',
  CLIENT = 'client',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar' })
  middleName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

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

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Freelancer, (freelancer) => freelancer.user)
  freelancers: Freelancer[];

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];
}
