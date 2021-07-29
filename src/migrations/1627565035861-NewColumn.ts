import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewColumn1627565035861 implements MigrationInterface {
  name = 'NewColumn1627565035861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assignment" ADD "language" nvarchar(20) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assignment" DROP COLUMN "language"`);
  }
}
