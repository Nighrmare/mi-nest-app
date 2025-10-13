/* eslint-disable prettier/prettier */

// Se importan los princiapeles 
// Module, permite definir un módulo que agrupa controladores, servicios y entidades relacionadas
import { Module } from '@nestjs/common';

// se importa TypeOrmModule para manejar entidades dentro de NestJS
import { TypeOrmModule } from '@nestjs/typeorm';

// se importan el controlador y servicio del modulo de productos
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

// se importa la entidad product para conectarla con la base de datos 
import { Product } from 'src/entities/product.entity';

// Se define el módulo 
@Module({

// se importa el modulo TypeOrmModule con la entidad Product 
  imports: [TypeOrmModule.forFeature([Product])],

// se registran el controlador y servicio 
  controllers: [ProductsController],
  providers: [ProductsService],

// se exporta el servicio para que pueda ser usado en otros modulos
  exports: [ProductsService],
})
export class ProductsModule {}
