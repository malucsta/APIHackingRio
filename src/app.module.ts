import { Module } from '@nestjs/common';
import { AirConditionerModule } from './air-conditioner/air-conditioner.module';
import { WaterResourceModule } from './water-resource/water-resources.module';

@Module({
  imports: [AirConditionerModule, WaterResourceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
