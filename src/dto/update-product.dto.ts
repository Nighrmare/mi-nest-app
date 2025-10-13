/* eslint-disable prettier/prettier */

// Se importa PartialType desde @nestjs/mapped-types
// Sirve para heredar todas las propiedades del CreateProductDTO pero marcarlas como opcionales
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './create-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// Define las reglas para actualizar un producto
// Extiende CreateProductDTO pero todas sus campos se vuelven son opcionales
export class UpdateProductDTO extends PartialType(CreateProductDTO) {

// El campo "estado" es opcional y debe ser booleano (true/false)
// Se usa para activar o desactivar un producto
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
