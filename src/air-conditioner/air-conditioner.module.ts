import { Module } from '@nestjs/common';
import { AirConditionerController } from './controllers/air-conditioner.controller';
import { AirConditionerService } from './services/air-conditioner.service';

@Module({
  imports: [],
  controllers: [AirConditionerController],
  providers: [AirConditionerService],
})
export class AirConditionerModule {}
