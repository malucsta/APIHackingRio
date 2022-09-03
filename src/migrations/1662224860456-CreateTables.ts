import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1662224860456 implements MigrationInterface {
  name = 'CreateTables1662224860456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "water-resource" ("id" uuid NOT NULL, "totalVolume" double precision NOT NULL, CONSTRAINT "PK_f607904b151aec911919c1facb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "air-conditioner-tracklog" ("id" uuid NOT NULL, "deviceId" uuid NOT NULL, "date" date NOT NULL, "activeHours" double precision NOT NULL, CONSTRAINT "PK_3ca7f9ca9b820dbd54f1a132902" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "air-conditioner" ("id" uuid NOT NULL, "isActive" boolean NOT NULL, "temperature" integer NOT NULL, "kiloWattsPerHour" double precision NOT NULL, "totalActiveHours" double precision NOT NULL, CONSTRAINT "PK_a486abd57c89dbffa190d95a768" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "water-resource-tracklog" ("id" uuid NOT NULL, "waterResourceId" uuid NOT NULL, "date" date NOT NULL, "dailyVolume" double precision NOT NULL, CONSTRAINT "PK_aa9933a2ca8973aa2e9c0cd6a50" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "water-resource-tracklog"`);
    await queryRunner.query(`DROP TABLE "air-conditioner"`);
    await queryRunner.query(`DROP TABLE "air-conditioner-tracklog"`);
    await queryRunner.query(`DROP TABLE "water-resource"`);
  }
}
