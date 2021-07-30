import { Module } from '@nestjs/common';
import { ProductViewController } from './product-view.controller';
import { ProductViewService } from './product-view.service';

@Module({
  controllers: [ProductViewController],
  providers: [ProductViewService],
})
export class ProductViewModule {}
