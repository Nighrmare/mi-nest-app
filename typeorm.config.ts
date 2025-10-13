import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Product } from './src/entities/product.entity';

// Se define la configuracion de TypeORM usando DataSource
dotenv.config();

// Se define la configuracion de TypeORM usando DataSource
export default new DataSource({
  type: 'mysql', // Tipo de base de datos
  host: process.env.DB_HOST, // Host de la base de datos
  port: Number(process.env.DB_PORT), // Puerto de la base de datos
  username: process.env.DB_USERNAME, // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos
  entities: [User, Product], // Entidades que representan las tablas
  migrations: ['./src/migrations/*.ts'], // Carpeta donde se encuentran las migraciones
});
