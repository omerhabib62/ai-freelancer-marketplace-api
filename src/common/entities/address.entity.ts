import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('address')
export class Address extends BaseEntity {
}
