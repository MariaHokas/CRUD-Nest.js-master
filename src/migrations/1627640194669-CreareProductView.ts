import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreareProductView1627640194669 implements MigrationInterface {
  name = 'CreareProductView1627640194669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE VIEW "api"."product_view" AS 
  SELECT [SalesLT].Product.ProductID AS id, [SalesLT].Product.[Name] AS productName, [SalesLT].ProductCategory.[Name] AS categoryName, [SalesLT].ProductDescription.[Description] AS productDescription
  FROM [SalesLT].Product
  LEFT JOIN [SalesLT].ProductCategory ON Product.ProductCategoryID = ProductCategory.ProductCategoryID
  LEFT JOIN [SalesLT].ProductModelProductDescription ON Product.ProductModelID = ProductModelProductDescription.ProductModelID
  LEFT JOIN [SalesLT].ProductDescription ON ProductModelProductDescription.ProductDescriptionID = ProductDescription.ProductDescriptionID
    `);
    await queryRunner.query(
      `INSERT INTO "AdventureWorksLT2019".."typeorm_metadata"("type", "database", "schema", "name", "value") VALUES (@0, @1, @2, @3, @4)`,
      [
        'VIEW',
        'AdventureWorksLT2019',
        'api',
        'product_view',
        'SELECT [SalesLT].Product.ProductID AS id, [SalesLT].Product.[Name] AS productName, [SalesLT].ProductCategory.[Name] AS categoryName, [SalesLT].ProductDescription.[Description] AS productDescription\n  FROM [SalesLT].Product\n  LEFT JOIN [SalesLT].ProductCategory ON Product.ProductCategoryID = ProductCategory.ProductCategoryID\n  LEFT JOIN [SalesLT].ProductModelProductDescription ON Product.ProductModelID = ProductModelProductDescription.ProductModelID\n  LEFT JOIN [SalesLT].ProductDescription ON ProductModelProductDescription.ProductDescriptionID = ProductDescription.ProductDescriptionID',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "AdventureWorksLT2019".."typeorm_metadata" WHERE "type" = 'VIEW' AND "database" = @0 AND "schema" = @1 AND "name" = @2`,
      ['AdventureWorksLT2019', 'api', 'product_view'],
    );
    await queryRunner.query(`DROP VIEW "api"."product_view"`);
  }
}
