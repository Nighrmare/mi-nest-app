/* eslint-disable prettier/prettier */

// Se importan los decoradores de validacion desde class-validator
// Estos sirven para aplicar reglas a los datos que recibe el backend
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

// Define las reglas de validacion para crear un producto 
export class CreateProductDTO {

// El nombre es obligatorio y debe ser texto
  @IsNotEmpty()
  @IsString()
  nombre: string;

// La descripcion es obligatoria y debe ser texto
  @IsNotEmpty()
  @IsString()
  descripcion: string;

// El precio es obligatorio, debe ser numero y no puede ser negativo
  @IsNumber()
  @Min(0)
  precio: number;

// La categoria es obligatoria y debe ser texto
  @IsNotEmpty()
  @IsString()
  categoria: string;

// El stock es obligatorio, debe ser numero y no puede ser negativo
  @IsNumber()
  @Min(0)
  stock: number;
}
