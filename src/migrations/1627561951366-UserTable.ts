import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1627561951366 implements MigrationInterface {
  name = 'UserTable1627561951366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "firstName" nvarchar(100), "lastName" nvarchar(100), "userName" nvarchar(100), "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "created" datetime2 NOT NULL CONSTRAINT "DF_8ce4c93ba419b56bd82e533724d" DEFAULT getdate(), "updated" datetime2 NOT NULL CONSTRAINT "DF_5904a9d40152f354e4c7b0202fb" DEFAULT getdate(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "assignment" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_43c2f5a3859f54cedafb270f37e" DEFAULT NEWSEQUENTIALID(), "assignment_number" int NOT NULL IDENTITY(1,1), "subject" nvarchar(250) NOT NULL, "description" text, "created" datetime2 NOT NULL CONSTRAINT "DF_cdf5581c102cb0de8416bacd564" DEFAULT getdate(), "updated" datetime2 NOT NULL CONSTRAINT "DF_50be1dedeeaa3c87cc23af0337c" DEFAULT getdate(), "assignment_owner_id" uniqueidentifier NOT NULL, CONSTRAINT "PK_43c2f5a3859f54cedafb270f37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "assignment" ADD CONSTRAINT "FK_2bcb54bf1d6b3c0364e6b96d4cd" FOREIGN KEY ("assignment_owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "assignment" DROP CONSTRAINT "FK_2bcb54bf1d6b3c0364e6b96d4cd"`,
    );
    await queryRunner.query(`DROP TABLE "assignment"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
