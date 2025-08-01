import { Entity, Column, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { Freelancer } from './freelancer.entity';
import { BaseEntity } from './base.entity';
import { JobStatus } from '../enums/job-status.enum';

@Entity('job_proposals')
export class JobProposal extends BaseEntity {
  @Column({ name: 'job_id', type: 'int' })
  jobId: number;

  @Column({ name: 'freelancer_id', type: 'int' })
  freelancerId: number;

  @Column({
    type: 'varchar',
  })
  status: JobStatus;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'submission_attachment', type: 'varchar', length: 255 })
  submissionAttachment: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: number;

  @ManyToOne(() => Job, (job) => job.proposals)
  job: Job;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.proposals)
  freelancer: Freelancer;
}
