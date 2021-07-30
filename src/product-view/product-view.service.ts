import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductView } from '../entities/productView.entity';

@Injectable()
export class ProductViewService {
  constructor(
    @InjectRepository(ProductView)
    private productRepository: Repository<ProductView>,
  ) {}

  async getProduct(): Promise<ProductView[]> {
    return await this.productRepository.find();
  }
}
