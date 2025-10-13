/* eslint-disable prettier/prettier */

// Se importan los decoradores y Excepciones necesarias
import { Injectable, NotFoundException } from '@nestjs/common';

// Se importa InjectRepository para inyectar el repositorio
import { InjectRepository } from '@nestjs/typeorm';

// Se importa la entidad User 
import { User } from 'src/entities/user.entity';

// Se importa la clase Repository de TypeORM para realizar operaciones en la base de datos
import { Repository } from 'typeorm';

// Se importan los DTOs que validan los datos que entran o se actualizan 
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

// Se define el servicio de usuarios y se marca como inyectable 
@Injectable()
export class UsersService {

// Se inyecta el repositorio de la entidad User
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>
    ) {}

//  Metodo para obtener todos los usuarios registrados 
// findAll, retorna todos los usuarios registrados en la base de datos
    findAll() {
        return this.usersRepo.find();
    }
// Metodo para obtener un usuario por su id
// findOne, busca un usuario por su id si no lo encuentra lanza un error NotFoundException
    async findOne(id: number) {
        const userFind = await this.usersRepo.findOne({ where: { id } })
        if (!userFind) throw new NotFoundException('Usuario no encontrado')
        return userFind
    }

// Metodo para crear un nuevo usuario
// create, crea un nuevo registrod e usuario 
// Usa .create() para construir el objeto y .save() para almacenarlo
    create(newUser: CreateUserDTO) {
        const userCreated = this.usersRepo.create(newUser);
        return this.usersRepo.save(userCreated);
    }

// Metodo para actualizar los datos de un usuario
    async update(id: number, updateUser: UpdateUserDTO) {
        await this.usersRepo.update(id, updateUser);
        return this.findOne(id);
    }

// Metodo para eliminar un usuario por su id
// Si se elimino devuelve un mensaje confirmando la eliminacion
// Si el usuario no existe, lanza una excepcion NotFoundException
    async remove(id: number) {
        const result = await this.usersRepo.delete(id)
        if (result.affected === 0) throw new NotFoundException(`Usuario con id ${id} no encontrado`)
        return { message: `El usuario con id ${id} fue eliminado correctamente` }
    }
}
