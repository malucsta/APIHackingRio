import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirConditionerController } from './controllers/air-conditioner.controller';
import { AirConditionerTrackLogEntity } from './entities/air-conditioner-tracklog.entity';
import { AirConditionerEntity } from './entities/air-conditioner.entity';
import { AirConditionerService } from './services/air-conditioner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AirConditionerEntity]),
    TypeOrmModule.forFeature([AirConditionerTrackLogEntity]),
  ],
  controllers: [AirConditionerController],
  providers: [AirConditionerService],
})
export class AirConditionerModule {}
