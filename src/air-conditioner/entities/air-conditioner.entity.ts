import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'air-conditioner' })
export class AirConditionerEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'boolean', nullable: false })
  isActive: boolean;

  @Column({ type: 'int', nullable: false })
  temperature: number;

  @Column({ type: 'float', nullable: false })
  kiloWattsPerHour: number;

  @Column({ type: 'float', nullable: false })
  totalActiveHours: number;
}
