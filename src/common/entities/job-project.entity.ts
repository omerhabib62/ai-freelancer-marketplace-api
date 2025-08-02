import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

export enum ProjectStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('projects')
export class JobProject extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User)
  client: User;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.OPEN,
  })
  status: ProjectStatus;

  @Column('decimal')
  budget: number;

  @Column()
  deadline: Date;
}
