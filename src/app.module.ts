/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

// Se define el modulo principal de la aplicacion
@Module({
  imports: [
    
// ConfigModule, permite acceder a las variables definidas en el archivo .env
    ConfigModule.forRoot({ isGlobal: true }),

// TypeOrmModule configurado 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Inyecta ConfigService para obtener las variables de entorno
      useFactory: (config: ConfigService) => ({
        type: 'mysql', // Tipo de base de datos
        host: config.get<string>('DB_HOST'), // Host de la base de datos
        port: config.get<number>('DB_PORT'), // Puerto de la base de datos
        username: config.get<string>('DB_USERNAME'), // Usuario de la base de datos
        password: config.get<string>('DB_PASSWORD'), // Contraseña de la base de datos
        database: config.get<string>('DB_NAME'), // Nombre de la base de datos
        autoLoadEntities: true, // Carga automáticamente las entidades
        synchronize: false, // No sincroniza automaticamente la base de datos
      }),
    }),

// Se importan los modulos funcionales de la aplicacion
    UsersModule,
    ProductsModule,
    AuthModule,
  ],

// Se registran el controlador y el servicio principal
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
