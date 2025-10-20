/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

// Se importan los decoradores y clases necesarias desde @nestjs/common
// Injectable, permite usar esta clase en otras partes del proyecto
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Se importa InjectRepository para inyectar el repositorio de TypeORM
import { InjectRepository } from '@nestjs/typeorm';

// Se importa JwtService para manejar la generacion y validacion de tokens JWT
import { JwtService } from '@nestjs/jwt';

// Se importa Repository desde TypeORM, que permite ejecutar metodos como find, save, etc.
import { Repository } from 'typeorm';

// Se importa bcrypt para encriptar contraseñas
import * as bcrypt from 'bcrypt';

// Se importan los DTOs usados para validar los datos de entrada
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';

// Se importa la entidad User
import { User } from 'src/entities/user.entity';

// Se marca como inyectable para poder usarla en otras partes del proyecto
@Injectable()
export class AuthService {

// El constructor define las dependencias que necesita este servicio
// UserRepo repositorio para acceder a la tabla users
// jwtService para generar y validar tokens JWT
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

// Metodo para registrar un nuevo usuario
// Encripta la contraseña, crea el usuario, lo guarda en la base de datos
// Y devuelve un mensaje de exito junto con el id y email del usuario creado  
    async register(data: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userCreated = this.userRepo.create({ ...data, password: hashedPassword });
        await this.userRepo.save(userCreated);
        return { message: 'Usuario registrado con exito', user: { id: userCreated.id, email: userCreated.email } }
    }

// Metodo para autenticar a un usuario
// verifica las credenciales, y si son validas genera y devuelve un token JWT
    async login(data: LoginDTO) {

// Busca un usuario con el email proporcionado
        const user = await this.userRepo.findOne({ where: { email: data.email } })

// Si no se encuentra el usuario, lanza un error 
        if (!user) {
            throw new UnauthorizedException("Credenciales invalidas - EMAIL");
        }

// Compara la contraseña proporcionada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(data.password, user.password)

// Si la contraseña no es valida, lanza un error
        if (!isPasswordValid) {
            throw new UnauthorizedException("Credenciales invalidas - PASSWORD");
        }

// Se genera el payload del token JWT con los datos del usuario
        const payloadToken = { sub: user.id, name: user.name, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payloadToken);

// Devuelve el token de acceso
        return { accessToken: token }
    }
}
