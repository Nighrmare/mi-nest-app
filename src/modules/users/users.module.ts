/* eslint-disable prettier/prettier */

// Se importan los mudulos y clases necesarias
// Module, define un modulo 
import { Module } from '@nestjs/common';

// Se importan el controlador y servicio del modulo de usuarios
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// Se importa TypeOrmModule para manejar la entidad User en la base de datos
import { TypeOrmModule } from '@nestjs/typeorm';

// Se importa la entidad User que representa la tabla en la base de datos
import { User } from 'src/entities/user.entity';

// Se define el modulo
@Module({

// Se importa TypeOrmModule con la entidad User
  imports: [TypeOrmModule.forFeature([User])],

// Se registran el controlador y el servicio del modulo 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
