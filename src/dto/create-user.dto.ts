/* eslint-disable prettier/prettier */

// Se importan los decoradores de validacion desde class-validator
// Se usan para asegurar que los datos del usuario sean correctos antes de guardarlos
import { IsEmail, IsInt, IsNotEmpty, Length, Max, Min,  } from "class-validator";

// Define las reglas de validacion para crear un usuario
export class CreateUserDTO {

// El nombre es obligatorio y debe ser texto
  @IsNotEmpty()
  name: string;

// El email es obligatorio y debe tener formato de email (luisa@example.com)
  @IsNotEmpty()
  @IsEmail()
  email: string;

// La contraseña es obligatoria y debe tener entre 6 y 10 caracteres
  @IsNotEmpty()
  @Length(6, 10, { message: "La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10" })
  password: string;

// La edad es obligatoria, debe ser un entero entre 18 y 100, no puede ser decimal    
  @IsNotEmpty({ message: 'La edad es obligatoria' })
  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(18, { message: "La edad debe ser mayor o igual a 18" })
  @Max(100, { message: 'La edad debe ser menor a 100' })
  age: number;
}
