import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  latitude: string;

  @Column({ type: 'varchar', length: 255 })
  longitude: string;
}
