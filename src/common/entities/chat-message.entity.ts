import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity('chat_messages')
export class ChatMessage extends BaseEntity {
  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @ManyToOne(() => Project, { nullable: true })
  project: Project;

  @Column('text')
  content: string;

  @Column()
  sentAt: Date;
}
