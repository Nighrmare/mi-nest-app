/* eslint-disable prettier/prettier */

// Se importan los decoradores necesarios de typeorm
// Entity, marca la clase como una tabla en la base de datos
// PrimaryGeneratedColumn, crea una columna id como autoincremental
// Column, define las demas columnas de la tabla
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type Roles = 'admin' | 'users'


export enum RolesEnum {
    ADMIN = 'admin',
    USER = 'user'
}

// Definimos la entidad "User", que se convertira en una tabla en la base de datos
@Entity()
export class User {

// ID autogenerado para identificar a cada usuario
  @PrimaryGeneratedColumn()
  id: number;

// Nombre del usuario es obligatorio
  @Column({ nullable: false })
  name: string;

// El email del usuario, debe ser unico y no puede estar vacio
  @Column({ nullable: false, unique: true })
  email: string;

// La contraseña del usuario
  @Column()
  password: string;

// La edad del usuario
  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ default: RolesEnum.USER })
    role: Roles;

}