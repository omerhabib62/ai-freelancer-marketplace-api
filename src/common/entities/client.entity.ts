import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';
import { BaseEntity } from './base.entity';
import { ClientType } from '../enums/client-type.enum';
import { JobRating } from './job-rating.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'national_id', type: 'varchar', length: 255 })
  nationalId: string;

  @Column({ name: 'national_id_type', type: 'varchar', length: 255 })
  nationalIdType: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({
    type: 'varchar',
  })
  type: ClientType;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: number;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @OneToMany(() => Job, (job) => job.client)
  jobs: Job[];

  @OneToMany(() => JobRating, (jobrating) => jobrating.client)
  ratings: JobRating;
}
