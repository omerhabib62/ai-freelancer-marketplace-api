import { Entity, Column, OneToMany, BeforeInsert } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Freelancer } from './freelancer.entity';
import { Client } from './client.entity';
import { Log } from './log.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UserRole } from '../enums/roles.enum';

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

  @Column({ type: 'varchar', length: '20', nullable: true })
  phone?: string;

  @Column()
  @Exclude()
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
