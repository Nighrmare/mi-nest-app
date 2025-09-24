import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Product {
    return this.productsService.findOne(Number(id));
  }
}
