import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { JobSkill } from './job-skill.entity';
import { Client } from './client.entity';
import { JobRating } from './job-rating.entity';
import { JobProposal } from './job-proposal.entity';
import { JobPayment } from './job-payment.entity';

@Entity('jobs')
export class Job extends BaseEntity {
  @Column({ name: 'client_id', type: 'int' })
  clientId: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ name: 'pay_rate_per_hour', type: 'float' })
  payRatePerHour: number;

  @Column({ name: 'expected_duration_in_hours', type: 'float' })
  expectedDurationInHours: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: number;

  @ManyToOne(() => Client, (client) => client.jobs)
  client: Client;

  @OneToMany(() => JobSkill, (jobSkill) => jobSkill.job)
  skills: JobSkill[];

  @OneToMany(() => JobProposal, (jobProposal) => jobProposal.job)
  proposals: JobProposal[];

  @OneToMany(() => JobPayment, (jobPayment) => jobPayment.job)
  payments: JobPayment[];

  @OneToMany(() => JobRating, (jobRating) => jobRating.job)
  ratings: JobRating[];
}
