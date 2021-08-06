import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProduct(): Promise<Product[]> {
    return await this.productRepository.find({
      order: { productId: 'DESC' },
    });
  }

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    return await this.productRepository.save(createProductDto);
  }

  async deleteProduct(user: Product) {
    this.productRepository.delete(user);
    return `---User deleted---`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.productRepository.update(id, updateProductDto);
    return `This action updates a #${id} assignment ${updateProductDto}`;
  }
}
