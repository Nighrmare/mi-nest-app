/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

// Se importan los decoradores y clases necesarias desde @nestjs/common
// para definir rutas y manejar peticiones 
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';

// Se importa el servicio de productos
import { ProductsService } from './products.service';

// Se importan los DTOs para validar los datos de creacion y actualizacion de productos
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

// Se importa el guard para proteger rutas con tokens JWT
import { JwtAuthGuard } from '../auth/jwt.guard';

// Se importa la entidad de producto
import { Product } from '../../entities/product.entity';

// Se importa el pipe personalizado para transformar y validar parametros
import { ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';

// Se define el controlador de productos con la ruta base /products
@Controller('products')
export class ProductsController {

// Inyeccion del servicio de productos para usarlo dentro de este controlador
  constructor(private readonly productsService: ProductsService) {}

//  GET /products para ver todos los productos que estan en estado true
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

//  GET /products/(id) para ver un producto por su id
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

// GET /products/by-name/(name) para ver un producto por su nombre
  @Get('by-name/:name')
  findByName(@Param('name', ParseUpperTrimPipe) name: string) {
    return this.productsService.findByName(name);
  }

//  POST /products para crear un nuevo producto
  @UseGuards(JwtAuthGuard)

// Esta ruta esta protegida con JwtAuthGuard solo usuarios autenticados pueden acceder
  @Post()
  create(@Body() body: CreateProductDTO) {
    return this.productsService.create(body);
  }

// PUT /products/(id) para actualizar un producto por su id
  @UseGuards(JwtAuthGuard)

// Esta ruta esta protegida con JwtAuthGuard solo usuarios autenticados pueden acceder
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDTO) {
    return this.productsService.update(id, body);
  }

// DELETE /products/(id) para desactivar un producto por su id
// Cambia el estado a false sin eliminar el registro
  @UseGuards(JwtAuthGuard)

// Esta ruta esta protegida con JwtAuthGuard solo usuarios autenticados pueden acceder
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.disabled(id);
  }
}
