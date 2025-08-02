import { Entity, ManyToOne, Column } from 'typeorm';
import { Skill } from './skill.entity';
import { BaseEntity } from './base.entity';
import { Job } from './job.entity';

@Entity('job_skills')
export class JobSkill extends BaseEntity {
  @Column({ name: 'job_id', type: 'int' })
  jobId: number;

  @Column({ name: 'skill_id', type: 'int' })
  skillId: number;

  @ManyToOne(() => Job, (job) => job.skills)
  job: Job;

  @ManyToOne(() => Skill, (skill) => skill.jobSkills)
  skill: Skill;
}
