import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'water-resource-tracklog' })
export class WaterResourceTrackLogEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid' })
  waterResourceId: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'float', nullable: false })
  dailyVolume: number;
}
