import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WaterResourceService } from '../services/water-resource.service';
import { PeriodDTO } from './periodDTO';
@ApiTags('Water Resources')
@Controller('water-resources')
export class WaterResourcesController {
  constructor(private readonly service: WaterResourceService) {}

  @ApiOperation({ description: `Retrives all water resources' data` })
  @Get()
  async findAll() {
    try {
      const data = await this.service.findAllData();
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ description: `Retrives one water resources' data by its id` })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.service.findOneData(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({
    description: `Retrives water resources' log data according to resource's id`,
  })
  @Get(':id/log')
  async findByWaterResource(@Param('id') id: string) {
    try {
      const data = await this.service.findByWaterResource(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({
    description: `Retrives all water resources' log data`,
  })
  @Get('log/all')
  async findAllLogs() {
    try {
      const data = await this.service.findAllLogs();
      return { message: {}, data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({
    description: `Retrives one water resources' log data according to log's id`,
  })
  @Get('log/:id')
  async findOneLog(@Param('id') id: string) {
    try {
      const data = await this.service.findOneLog(id);
      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({
    description: `Retrives water resources' log data of a period 
      according water resource id and period`,
  })
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

  @ApiOperation({
    description: `Gererates a certain number of water resources mocks and 10 corresponding logs`,
  })
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
