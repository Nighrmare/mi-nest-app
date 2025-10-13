/* eslint-disable prettier/prettier */

// Se importan los decoradores necesarios desde class-validator
// Se usan para validar los datos al iniciar sesion
import { IsEmail, Length } from 'class-validator';

// Define las reglas de validacion para el login
export class LoginDTO {

// El email es obligatorio y debe tener formato de email (luisa@example.com)
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

// La contraseña es obligatoria y debe tener entre 6 y 10 caracteres
  @Length(6, 10, {
    message:
      'La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10',
  })
  password: string;
}
