import { Entity, Column, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { BaseEntity } from './base.entity';

@Entity('job_payments')
export class JobPayment extends BaseEntity {
  @Column({ name: 'job_id', type: 'int' })
  jobId: number;

  @Column({ name: 'phone_number', type: 'varchar', length: 12 })
  phoneNumber: string;

  @Column({ type: 'float' })
  amount: number;

  @Column({ name: 'is_payment_successful', type: 'boolean', default: false })
  isPaymentSuccessful: boolean;

  @ManyToOne(() => Job, (job) => job.payments)
  job: Job;
}
