import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { AirConditionerService } from '../services/air-conditioner.service';
import { PeriodDTO } from './periodDTO';

@Controller('air-conditioner')
export class AirConditionerController {
  constructor(private readonly service: AirConditionerService) {}

  @Get()
  async findAll() {
    try {
      const data = await this.service.findAllData();
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //get air conditioner data by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.service.findOneData(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async toggleAir(@Param('id') id: string) {
    try {
      const data = await this.service.toggleAirConditioner(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('log/all')
  async findAllLogs() {
    try {
      const data = await this.service.findAllLogs();
      return { message: {}, data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('log/:id')
  async findOneLog(@Param('id') id: string) {
    try {
      const data = await this.service.findOneLog(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post('log/:id')
  async findByPeriod(@Param('id') id: string, @Body() period: PeriodDTO) {
    try {
      const data = await this.service.findDeviceLogByPeriod(
        id,
        period.startDate,
        period.finishDate,
      );
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //gererates a certain number of mocks
  @Post('random/:number')
  async insertNumberOfRandomicData(@Param('number') number: number) {
    try {
      const data = await this.service.insertNumberOfRandomicData(number);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
