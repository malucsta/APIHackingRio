import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AirConditionerService {
  private item = {
    id: 'de3b5676-f210-47af-8d8b-1e05fbaa7c8b',
    isActive: true,
    temperature: 18,
    kiloWattsPerHour: 350,
    totalActiveHours: 288,
  };

  async findAllData() {
    return await this.generateRandomicAirConditioner(10);
  }

  async findOneData(id: string) {
    const { randomInt } = await import('crypto');

    return {
      id: id,
      isActive: true,
      temperature: randomInt(16, 26),
      kiloWattsPerHour: randomInt(200, 500),
      totalActiveHours: randomInt(0, 800),
    };
  }

  async findAllLogs() {
    return await this.generateRandomicAirConditionerLog(10);
  }

  async findOneLog(id: string) {
    const { randomInt } = await import('crypto');

    const date = faker.date.recent(randomInt(2, 100));
    if (date.getDay() == 0) date.setDate(1);
    const formatedDate =
      date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

    return {
      id: id,
      deviceId: id,
      date: formatedDate,
      activeHours: randomInt(0, 24),
    };
  }

  async findDeviceLogByPeriod(
    deviceId: string,
    startDate: Date,
    finishDate: Date,
  ) {
    return await this.generateRandomicAirConditionerLog(
      10,
      startDate,
      finishDate,
    );
  }

  async toggleAirConditioner(id: string) {
    const oldValue = this.item;

    this.item = {
      id: id,
      isActive: oldValue.isActive ? false : true,
      temperature: 18,
      kiloWattsPerHour: 350,
      totalActiveHours: 288,
    };

    return this.item;
  }

  async generateRandomicAirConditioner(quantity: number) {
    const array = Array.from({ length: quantity }, (_, i) => i + 1);
    const response = [];

    const { randomInt } = await import('crypto');
    const id = randomUUID();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of array) {
      response.push({
        id: id,
        isActive: true,
        temperature: randomInt(16, 26),
        kiloWattsPerHour: randomInt(200, 500),
        totalActiveHours: randomInt(0, 800),
      });
    }

    return response;
  }

  async generateRandomicAirConditionerLog(
    quantity: number,
    startDate?: Date,
    finishDate?: Date,
  ) {
    const array = Array.from({ length: quantity }, (_, i) => i + 1);
    const response = [];
    let startMonth = null,
      finishMonth = null;

    if (startDate && finishDate) {
      startMonth = startDate.toString().slice(5, 7);
      finishMonth = finishDate.toString().slice(5, 7);
    }

    const { randomInt } = await import('crypto');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of array) {
      //mock date
      const date = faker.date.recent(randomInt(2, 100));
      if (date.getDay() == 0) date.setDate(1);

      const formatedDate =
        startMonth != null && finishMonth != null
          ? date.getDay() +
            '/' +
            randomInt(Number(startMonth), Number(finishMonth) + 1) +
            '/' +
            date.getFullYear()
          : date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

      const id = randomUUID();

      response.push({
        id: randomUUID(),
        deviceId: id,
        date: formatedDate,
        activeHours: randomInt(0, 24),
      });
    }

    return response;
  }
}
