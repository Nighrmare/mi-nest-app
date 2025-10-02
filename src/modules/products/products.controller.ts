/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
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

  @Post()
  create(@Body() product: Omit<Product, 'id'>): Product {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() product: Partial<Product>,
  ): Product {
    return this.productsService.update(Number(id), product);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.productsService.remove(Number(id));
  }
}