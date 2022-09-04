import { Module } from '@nestjs/common';
import { WaterResourcesController } from './controllers/water-resource.controller';
import { WaterResourceService } from './services/water-resource.service';

@Module({
  imports: [],
  controllers: [WaterResourcesController],
  providers: [WaterResourceService],
})
export class WaterResourceModule {}
