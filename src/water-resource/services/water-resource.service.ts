import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { WaterResourceTrackLogEntity } from '../entities/water-resource-tracklog.entity';
import { WaterResourceEntity } from '../entities/water-resources.entity';

@Injectable()
export class WaterResourceService {
  constructor(
    @InjectRepository(WaterResourceEntity)
    private readonly repository: Repository<WaterResourceEntity>,
    @InjectRepository(WaterResourceTrackLogEntity)
    private readonly logRepository: Repository<WaterResourceTrackLogEntity>,
  ) {}

  async findAllData() {
    const data = await this.repository.find();
    if (!data) return Error('Entity was not found');
    return data;
  }

  async findOneData(id: string) {
    const data = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!data) return Error('Entity was not found');
    return data;
  }

  async findAllLogs() {
    const data = await this.logRepository.find();
    if (!data) return Error('Entity was not found');
    return data;
  }

  async findOneLog(id: string) {
    const data = await this.logRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!data) return Error('Entity was not found');
    return data;
  }

  async findByWaterResource(id: string) {
    const data = await this.logRepository.find({
      where: {
        waterResourceId: id,
      },
    });
    if (!data) return Error('Entity was not found');
    return data;
  }

  async findLogByPeriod(id: string, startDate: Date, finishDate: Date) {
    const logs = await this.findAllLogs();

    if (logs instanceof Error) return Error('No entities were found');

    const data = logs
      .map((log) => {
        if (
          log.date >= startDate &&
          log.date <= finishDate &&
          log.waterResourceId == id
        )
          return log;
      })
      .filter((item) => item != null);

    if (!data) return Error('Entity was not found');
    return data;
  }

  async insertRandomicData() {
    const { randomInt } = await import('crypto');
    const id = randomUUID();

    const logArray = [];
    let totalVolume = 0;

    Array.from({ length: 10 }, (_, i) => i + 1).map(async () => {
      //mock date
      const date = faker.date.recent(randomInt(2, 40));
      const formatedDate =
        date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

      const volume = randomInt(0, 500);
      totalVolume += volume;

      //mock data
      logArray.push(
        await this.logRepository.save({
          id: randomUUID(),
          waterResourceId: id,
          date: formatedDate,
          dailyVolume: volume,
        }),
      );
    });

    const data = await this.repository.save({
      id: id,
      totalVolume: totalVolume,
    });

    if (!data || !logArray) return Error('Error while mocking data');

    return { created: data, log: logArray };
  }

  async insertNumberOfRandomicData(quantity: number) {
    const array = Array.from({ length: quantity }, (_, i) => i + 1);
    const response = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of array) {
      response.push(await this.insertRandomicData());
    }

    return response;
  }
}
