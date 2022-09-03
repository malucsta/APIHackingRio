import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AirConditionerTrackLogEntity } from '../entities/air-conditioner-tracklog.entity';
import { AirConditionerEntity } from '../entities/air-conditioner.entity';

@Injectable()
export class AirConditionerService {
  constructor(
    @InjectRepository(AirConditionerEntity)
    private readonly repository: Repository<AirConditionerEntity>,
    @InjectRepository(AirConditionerTrackLogEntity)
    private readonly logRepository: Repository<AirConditionerTrackLogEntity>,
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

  async findDeviceLogByPeriod(
    deviceId: string,
    startDate: Date,
    finishDate: Date,
  ) {
    const logs = await this.findAllLogs();

    if (logs instanceof Error) return Error('No entities were found');

    const data = logs
      .map((log) => {
        if (
          log.date >= startDate &&
          log.date <= finishDate &&
          log.deviceId == deviceId
        )
          return log;
      })
      .filter((item) => item != null);

    if (!data) return Error('Entity was not found');
    return data;
  }

  async toggleAirConditioner(id: string) {
    const air = await this.findOneData(id);
    if (air instanceof Error) return Error('This device does not exist');

    const data = {
      id: id,
      isActive: air.isActive ? false : true,
      temperature: air.temperature,
      kiloWattsPerHour: air.kiloWattsPerHour,
      totalActiveHours: air.totalActiveHours,
    };

    const result = await this.repository.save(data);
    if (!result) return Error('Error while toggling air');

    return result;
  }

  async insertRandomicData() {
    const { randomInt } = await import('crypto');
    const id = randomUUID();

    const logArray = [];
    let totalActiveHours = 0;

    for (const index of Array.from({ length: 10 }, (_, i) => i + 1)) {
      //mock date
      const date = faker.date.recent(randomInt(2, 100));
      if (date.getDay() == 0) date.setDate(1);
      const formatedDate =
        date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

      const activeHours = randomInt(0, 24);
      totalActiveHours += activeHours;

      //mock data
      logArray.push(
        await this.logRepository.save({
          id: randomUUID(),
          deviceId: id,
          date: formatedDate,
          activeHours: activeHours,
        }),
      );
    }

    const data = await this.repository.save({
      id: id,
      isActive: true,
      temperature: randomInt(16, 26),
      kiloWattsPerHour: randomInt(200, 500),
      totalActiveHours: totalActiveHours,
    });

    if (!data || !logArray) return Error('Error while inserting data');
    return { created: data, logs: logArray };
    return null;
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
