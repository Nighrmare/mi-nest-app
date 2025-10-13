/* eslint-disable prettier/prettier */

// Se importan los modulos y servicios necesarios de NestJS y TypeORM
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Se importa la entidad User que representa la tabla de usuarios en la base de datos
import { User } from 'src/entities/user.entity';

// Se importan los servicios y controladores de autenticacion
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Se importa el servicio de usuarios para manejar operaciones relacionadas con usuarios
import { UsersService } from '../users/users.service';

// Se importan de autenticacion (Passport y JWT)
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';

// Se importan los modulos para manejar variables de entorno
import { ConfigModule, ConfigService } from '@nestjs/config';

// Se importa la estrategia JWT personalizada
import { JwtStrategy } from './jwt.strategy';

// se define el modulo de autenticacion
@Module({
  imports: [

// configModule permite acceder a variables .env en toda la aplicacion
    ConfigModule.forRoot({ isGlobal: true }),

// TypeOrmModule para trabajar con la entidad User
    TypeOrmModule.forFeature([User]),

// PassportModule para manejar la autenticacion con diferentes estrategias
    PassportModule.register({ defaultStrategy: 'jwt' }),

// JwtModule configura la generacion y validacion de tokens 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '1h') as JwtSignOptions['expiresIn'],
        },
      }),
    }),
  ],

// Se registran los servicios y controladores del modulo
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
})

// Se exporta el servicio de autenticacion para usarlo en otros modulos
export class AuthModule {}
