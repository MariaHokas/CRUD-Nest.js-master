import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  schema: 'api',
  expression: `
  SELECT [SalesLT].Product.ProductID AS id, [SalesLT].Product.[Name] AS productName, [SalesLT].ProductCategory.[Name] AS categoryName, [SalesLT].ProductDescription.[Description] AS productDescription
  FROM [SalesLT].Product
  LEFT JOIN [SalesLT].ProductCategory ON Product.ProductCategoryID = ProductCategory.ProductCategoryID
  LEFT JOIN [SalesLT].ProductModelProductDescription ON Product.ProductModelID = ProductModelProductDescription.ProductModelID
  LEFT JOIN [SalesLT].ProductDescription ON ProductModelProductDescription.ProductDescriptionID = ProductDescription.ProductDescriptionID
    `,
})
export class ProductView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  productName: string;

  @ViewColumn()
  categoryName: string;

  @ViewColumn()
  productDescription: string;
}
