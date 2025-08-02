import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { JobProject } from './job-project.entity';

export enum BidStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('bids')
export class Bid extends BaseEntity {
  @Column('decimal')
  amount: number;

  @Column()
  timeline: number;

  @ManyToOne(() => User)
  freelancer: User;

  @ManyToOne(() => JobProject)
  jobProject: JobProject;

  @Column({
    type: 'enum',
    enum: BidStatus,
    default: BidStatus.PENDING,
  })
  status: BidStatus;
}
