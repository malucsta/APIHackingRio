import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'air-conditioner-tracklog' })
export class AirConditionerTrackLogEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  deviceId: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'float', nullable: false })
  activeHours: number;
}
