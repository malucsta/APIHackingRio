import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AirConditionerModule } from './air-conditioner/air-conditioner.module';
import { WaterResourceModule } from './water-resource/water-resources.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AirConditionerModule,
    WaterResourceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
