import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { LogActions } from '../enums/log-actions.enum';

@Entity('logs')
export class Log extends BaseEntity {
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({
    name: 'action',
    type: 'varchar',
  })
  action: LogActions;

  @Column({ name: 'ip_address', type: 'varchar', length: 255 })
  ipAddress: string;

  @CreateDateColumn()
  time_created: Date;

  @ManyToOne(() => User, (user) => user.logs)
  user: User;
}
