import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AirConditionerModule } from './air-conditioner/air-conditioner.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AirConditionerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
