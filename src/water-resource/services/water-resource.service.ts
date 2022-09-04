import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class WaterResourceService {
  async findAllData() {
    return this.generateWaterResource(10);
  }

  async findOneData(id: string) {
    const { randomInt } = await import('crypto');

    return {
      id: id,
      totalVolume: randomInt(0, 10000),
    };
  }

  async findAllLogs() {
    return this.generateWaterResourceLog(10);
  }

  async findOneLog(id: string) {
    const { randomInt } = await import('crypto');

    const date = faker.date.recent(randomInt(2, 40));
    const formatedDate =
      date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

    return {
      id: id,
      waterResourceId: randomUUID(),
      date: formatedDate,
      dailyVolume: randomInt(0, 2000),
    };
  }

  async findByWaterResource(id: string) {
    const { randomInt } = await import('crypto');

    return this.generateWaterResourceLog(randomInt(1, 10), id);
  }

  async findLogByPeriod(id: string, startDate: Date, finishDate: Date) {
    const { randomInt } = await import('crypto');

    return this.generateWaterResourceLog(
      randomInt(1, 10),
      null,
      startDate,
      finishDate,
    );
  }

  async generateWaterResource(quantity: number) {
    const array = Array.from({ length: quantity }, (_, i) => i + 1);
    const response = [];

    const { randomInt } = await import('crypto');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of array) {
      const id = randomUUID();
      response.push({
        id: id,
        totalVolume: randomInt(0, 10000),
      });
    }

    return response;
  }

  async generateWaterResourceLog(
    quantity: number,
    waterResourceId?: string,
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
      const date = faker.date.recent(randomInt(2, 40));
      if (date.getDay() == 0) date.setDate(1);
      const formatedDate =
        startMonth != null && finishMonth != null
          ? date.getDay() +
            '/' +
            randomInt(Number(startMonth), Number(finishMonth) + 1) +
            '/' +
            date.getFullYear()
          : date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

      response.push({
        id: randomUUID(),
        waterResourceId: waterResourceId ? waterResourceId : randomUUID(),
        date: formatedDate,
        dailyVolume: randomInt(0, 2000),
      });
    }

    return response;
  }
}
