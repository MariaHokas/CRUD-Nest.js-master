import { MigrationInterface, QueryRunner } from 'typeorm';

export class ColumnXDeleted1627891154530 implements MigrationInterface {
  name = 'ColumnXDeleted1627891154530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "DF_5904a9d40152f354e4c7b0202fb"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updated" datetime2 NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "DF_5904a9d40152f354e4c7b0202fb" DEFAULT getdate() FOR "updated"`,
    );
  }
}
