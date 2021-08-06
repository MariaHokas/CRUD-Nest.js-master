import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('order')
  getProduct(): Promise<Product[]> {
    return this.productService.getProduct();
  }

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param() params) {
    return this.productService.deleteProduct(params.id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
}
