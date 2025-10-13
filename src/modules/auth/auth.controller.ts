/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

// Se importan los decoradores y clases necesarias desde @nestjs/common
// Body, para acceder a los datos del cuerpo de la solicitud
// controller, Get, Post, para definir rutas y metodos HTTP
// Request, para acceder a los datos del usuario autenticado
// UseGuards, para proteger rutas con autenticacion JWT
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

// Se importa el servicio de autenticacion
import { AuthService } from './auth.service';

// Se importan los DTO que validan los datos de registro e inicio de sesion
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { LoginDTO } from 'src/dto/login.dto';

// Se importa el guard para proteger rutas con tokens JWT
import { JwtAuthGuard } from './jwt.guard';

// Define el controlador de autenticacion con la ruta base /auth
@Controller('auth')
export class AuthController {

// Inyecta el servicio de autenticacion en el controlador
    constructor(private readonly authService: AuthService) {}

// Endpoint POST /auth/register
// Registra un nuevo usuario, encripta su contraseña y guarda sus datos
    @Post('register')
    register(@Body() data: CreateUserDTO) {
        return this.authService.register(data);
    }

// Endpoint POST /auth/login
// Verifica las credenciales y devuelve un token JWT si son validas
    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }

// Endpoint GET /auth/profile
// Solo accesible con un token JWT valido
// Devuelve los datos del usuario autenticado
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
