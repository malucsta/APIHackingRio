import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { WaterResourceService } from '../services/water-resource.service';
import { PeriodDTO } from './periodDTO';

@Controller('water-resources')
export class WaterResourcesController {
  constructor(private readonly service: WaterResourceService) {}

  @Get()
  async findAll() {
    try {
      const data = await this.service.findAllData();
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //get water-resource data by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.service.findOneData(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id/log')
  async findByWaterResource(@Param('id') id: string) {
    try {
      const data = await this.service.findByWaterResource(id);
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

  //get water-resource log by id
  @Get('log/:id')
  async findOneLog(@Param('id') id: string) {
    try {
      const data = await this.service.findOneLog(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //get water-resource log by id and period
  @Post('log/:id')
  async findByPeriod(@Param('id') id: string, @Body() period: PeriodDTO) {
    try {
      const data = await this.service.findLogByPeriod(
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
