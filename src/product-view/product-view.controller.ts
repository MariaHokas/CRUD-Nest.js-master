import { Body, Controller, Get } from '@nestjs/common';
import { ProductView } from '../entities/productView.entity';
import { ProductViewService } from './product-view.service';

@Controller('product-view')
export class ProductViewController {
  constructor(private service: ProductViewService) {}

  @Get()
  findAll(@Body() productView: ProductView) {
    return this.service.getProduct();
  }
}
