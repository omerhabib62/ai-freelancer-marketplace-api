import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('courses')
export class Course extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('jsonb')
  content: object;

  @ManyToOne(() => User)
  createdBy: User;
}
