import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { FreelancerSkill } from './freelancer-skill.entity';
import { JobReview } from './job-review.entity';
import { JobProposal } from './job-proposal.entity';

@Entity('freelancers')
export class Freelancer extends BaseEntity {
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'national_id', type: 'varchar', length: 255 })
  nationalId: string;

  @Column({ name: 'national_id_type', type: 'varchar' })
  nationalIdType: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'years_of_experience', type: 'int' })
  yearsOfExperience: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: number;

  @ManyToOne(() => User, (user) => user.freelancers)
  user: User;

  @OneToMany(
    () => FreelancerSkill,
    (freelancerSkill) => freelancerSkill.freelancer,
  )
  skills: FreelancerSkill[];

  @OneToMany(() => JobProposal, (jobProposal) => jobProposal.freelancer)
  proposals: JobProposal[];

  @OneToMany(() => JobReview, (jobReview) => jobReview.freelancer)
  ratings: JobReview[];
}
