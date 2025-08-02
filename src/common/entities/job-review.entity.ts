import { Entity, Column, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { Freelancer } from './freelancer.entity';
import { Client } from './client.entity';
import { BaseEntity } from './base.entity';
import { ReviewType } from '../enums/review-type.enum';

@Entity('job_reviews')
export class JobReview extends BaseEntity {
  @Column({ name: 'job_id', type: 'int' })
  jobId: number;

  @Column({ type: 'int' })
  type: number; // Assuming 'who rated' is an enum or int reference

  @Column({ type: 'varchar' })
  rating: ReviewType;

  @Column({ type: 'text', comment: 'review text of client for review type' })
  comment: string;

  @ManyToOne(() => Job, (job) => job.ratings)
  job: Job;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.ratings)
  freelancer: Freelancer;

  @ManyToOne(() => Client, (client) => client.ratings)
  client: Client;
}
