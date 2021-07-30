import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductView } from '../entities/productView.entity';
import { ProductViewController } from './product-view.controller';
import { ProductViewService } from './product-view.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductView])],
  controllers: [ProductViewController],
  providers: [ProductViewService],
})
export class ProductViewModule {}
