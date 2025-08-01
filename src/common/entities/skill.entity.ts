import { Entity, Column, OneToMany } from 'typeorm';
import { FreelancerSkill } from './freelancer-skill.entity';
import { BaseEntity } from './base.entity';
import { JobSkill } from './job-skill.entity';

@Entity('skills')
export class Skill extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => FreelancerSkill, (freelancerSkill) => freelancerSkill.skill)
  freelancerSkills: FreelancerSkill[];

  @OneToMany(() => JobSkill, (jobSkill) => jobSkill.skill)
  jobSkills: JobSkill[];
}
