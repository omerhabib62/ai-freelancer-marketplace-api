import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Freelancer } from './freelancer.entity';
import { Skill } from './skill.entity';

@Entity('freelancer_skills')
export class FreelancerSkill extends BaseEntity {
  @Column({ type: 'int' })
  freelancer_id: number;

  @Column({ type: 'int' })
  skill_id: number;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.skills)
  freelancer: Freelancer;

  @ManyToOne(() => Skill, (skill) => skill.freelancerSkills)
  skill: Skill;
}
