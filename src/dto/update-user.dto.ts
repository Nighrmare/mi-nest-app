// Se importa el DTO base para crear usuarios
// Como las reglas son iguales, lo reutilizamos
import { IsNotEmpty } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';
import * as userEntity from 'src/entities/user.entity';
// Define las reglas para actualizar un usuario
// Hereda todas las validaciones del CreateUserDTO
export class UpdateUserDTO extends CreateUserDTO {
  @IsNotEmpty()
  role: userEntity.Roles;
}
