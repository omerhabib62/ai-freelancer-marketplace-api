import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { JobProject } from './job-project.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @ManyToOne(() => JobProject, { nullable: true })
  jobProject: JobProject;

  @Column({ type: 'boolean', default: 'false' })
  markAsRead: boolean;

  @Column('text')
  content: string;

  @Column()
  sentAt: Date;
}
