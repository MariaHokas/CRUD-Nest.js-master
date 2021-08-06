import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productNumber: string;

  @IsInt()
  @IsNotEmpty()
  standardCost: number;

  @IsInt()
  @IsNotEmpty()
  listPrice?: number;
}
