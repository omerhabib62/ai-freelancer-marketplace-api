import { Entity, Column, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { Freelancer } from './freelancer.entity';
import { Client } from './client.entity';
import { BaseEntity } from './base.entity';

@Entity('job_ratings')
export class JobRating extends BaseEntity {
  @Column({ name: 'jon_id', type: 'int' })
  jobId: number;

  @Column({ type: 'int' })
  type: number; // Assuming 'who rated' is an enum or int reference

  @Column({ type: 'enum', enum: ['freelancer', 'client'] })
  rating: string;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => Job, (job) => job.ratings)
  job: Job;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.ratings)
  freelancer: Freelancer;

  @ManyToOne(() => Client, (client) => client.ratings)
  client: Client;
}
