// Se importa el DTO base para crear usuarios
// Como las reglas son iguales, lo reutilizamos
import { CreateUserDTO } from './create-user.dto';

// Define las reglas para actualizar un usuario
// Hereda todas las validaciones del CreateUserDTO
export class UpdateUserDTO extends CreateUserDTO {}
