import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';

@Entity('quizzes')
export class Quiz extends BaseEntity {
  @ManyToOne(() => Course)
  course: Course;

  @Column('jsonb')
  questions: object;
}
