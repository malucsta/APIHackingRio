import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterResourcesController } from './controllers/water-resource.controller';
import { WaterResourceTrackLogEntity } from './entities/water-resource-tracklog.entity';
import { WaterResourceEntity } from './entities/water-resources.entity';
import { WaterResourceService } from './services/water-resource.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WaterResourceEntity]),
    TypeOrmModule.forFeature([WaterResourceTrackLogEntity]),
  ],
  controllers: [WaterResourcesController],
  providers: [WaterResourceService],
})
export class WaterResourceModule {}
