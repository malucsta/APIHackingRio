import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWaterResource1662223555706
  implements MigrationInterface
{
  name = 'CreateTableWaterResource1662223555706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "water-resource-tracklog" ("id" uuid NOT NULL, "waterResourceId" uuid NOT NULL, "date" date NOT NULL, "dailyVolume" double precision NOT NULL, CONSTRAINT "PK_aa9933a2ca8973aa2e9c0cd6a50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "water-resource" ("id" uuid NOT NULL, "totalVolume" double precision NOT NULL, CONSTRAINT "PK_f607904b151aec911919c1facb7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "water-resource"`);
    await queryRunner.query(`DROP TABLE "water-resource-tracklog"`);
  }
}
