import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'water-resource' })
export class WaterResourceEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'float', nullable: false })
  totalVolume: number;
}
