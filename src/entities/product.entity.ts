import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Product', { schema: 'SalesLT' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ProductID' })
  productId: number;

  @Column('nvarchar', { name: 'Name', length: 50 })
  name: string;

  @Column('nvarchar', { name: 'ProductNumber', length: 25 })
  productNumber: string;

  @Column('nvarchar', { name: 'Color', nullable: true, length: 15 })
  color: string | null;

  @Column('money', { name: 'StandardCost' })
  standardCost: number;

  @Column('money', { name: 'ListPrice' })
  listPrice: number;

  @Column('nvarchar', { name: 'Size', nullable: true, length: 5 })
  size: string | null;

  @Column('decimal', { name: 'Weight', nullable: true, precision: 8, scale: 2 })
  weight: number | null;

  @Column('int', { name: 'ProductCategoryID', nullable: true })
  productCategoryId: number | null;

  @Column('int', { name: 'ProductModelID', nullable: true })
  productModelId: number | null;

  @CreateDateColumn()
  sellStartDate: Date;

  @Column('datetime', { name: 'SellEndDate', nullable: true })
  sellEndDate: Date | null;

  @Column('datetime', { name: 'DiscontinuedDate', nullable: true })
  discontinuedDate: Date | null;

  @Column('varbinary', { name: 'ThumbNailPhoto', nullable: true })
  thumbNailPhoto: Buffer | null;

  @Column('nvarchar', {
    name: 'ThumbnailPhotoFileName',
    nullable: true,
    length: 50,
  })
  thumbnailPhotoFileName: string | null;

  @Column('uniqueidentifier', { name: 'rowguid', default: () => 'newid()' })
  rowguid: string;

  @Column('datetime', { name: 'ModifiedDate', default: () => 'getdate()' })
  modifiedDate: Date;

  // @OneToMany(
  //   () => SalesOrderDetail,
  //   (salesOrderDetail) => salesOrderDetail.product,
  // )
  // salesOrderDetails: SalesOrderDetail[];
}
