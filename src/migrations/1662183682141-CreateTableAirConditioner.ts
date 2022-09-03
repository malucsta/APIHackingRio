import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAirConditioner1662183682141
  implements MigrationInterface
{
  name = 'CreateTableAirConditioner1662183682141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "air-conditioner-tracklog" ("id" uuid NOT NULL, "date" date NOT NULL, "activeHours" double precision NOT NULL, CONSTRAINT "PK_3ca7f9ca9b820dbd54f1a132902" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "air-conditioner" ("id" uuid NOT NULL, "isActive" boolean NOT NULL, "temperature" integer NOT NULL, "kiloWattsPerHour" double precision NOT NULL, "totalActiveHours" double precision NOT NULL, CONSTRAINT "PK_a486abd57c89dbffa190d95a768" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "air-conditioner"`);
    await queryRunner.query(`DROP TABLE "air-conditioner-tracklog"`);
  }
}
