/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */

// Se importan los decoradores y clases necesarias
// Body, obtiner el cuerpo de la petición
// Controller, define un controlador para manejar rutas
// Delete, Get, Post, Put, definen los métodos HTTP
// Param, para obtener parametros de la ruta
// ParseIntPipe, convierte los parametros recibidos a tipo numero
// UseGuards, aplicar guards para proteger rutas
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards,  } from '@nestjs/common';

// Se importa el servicio que maneja la logica del modulo de usuarios
import { UsersService } from './users.service';

// Se importan los DTOs para validar los datos de entrada
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

// Se importa el guard para proteger rutas con tokens JWT
import { JwtAuthGuard } from '../auth/jwt.guard';

import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Se define el controlador de usuarios con la ruta base /users
@Controller('users')

// Se aplica el JwtAuthGuard a todas las rutas de este controlador
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
// Se inyecta el servicio de usuarios para usarlo en este controlador
constructor(private readonly usersService: UsersService) {}

// GET /users
// Retorna todos los usuarios
@Get()
@Roles(RolesEnum.ADMIN)
findAll() {
    return this.usersService.findAll();
}

// GET /users/(id) 
// Retorna un usuario por su id
@Get(':id')
@Roles(RolesEnum.ADMIN)
findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
}

// POST /users
// Crea un nuevo usuario en la base de datos
// Recibe la informacion y la valida con CreateUserDTO
@Post()
@Roles(RolesEnum.ADMIN)
create(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
}


@Put(':id')
@Roles(RolesEnum.ADMIN)
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUser: UpdateUserDTO,
) {
  if (updateUser.password === '') {
    throw new BadRequestException('La contraseña no puede estar vacía');
  }

  const hashedPassword = await bcrypt.hash(updateUser.password, 10);
  updateUser.password = hashedPassword;

  return this.usersService.update(id, updateUser);
}

// DELETE /users/(id)
// Elimina un usuario por su id
// Devuelve un mensaje de confirmacion
@Delete(':id')
@Roles(RolesEnum.ADMIN)
remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id))
}
}
