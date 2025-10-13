/* eslint-disable prettier/prettier */

// Se importan los decoradores necesarios de TypeORM
// Entity, marca la clase como una tabla en la base de datos
// PrimaryGeneratedColumn, crea una columna id como autoincremental
// Column, define las demas columnas de la tabla
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Se define la entidad "products" que representa una tabla en la base de datos
@Entity('products')
export class Product {

// ID autogenerado para identificar cada producto
  @PrimaryGeneratedColumn()
  id: number;

// Nombre del producto (texto con maximo 100 caracteres)
  @Column({ length: 100 })
  nombre: string;

// Descripcion detallada del producto (tipo texto largo)
  @Column('text')
  descripcion: string;

// Precio del producto (decimal con 2 decimales, ejemplo: 199.99)
  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

// Estado del producto (activo = true /inactivo = false), por defecto es activo (true)
  @Column({ default: true })
  estado: boolean;

// Categoria del producto (texto con maximo 100 caracteres) (ejemplo: "Electronica", "Ropa")
  @Column({ length: 100 })
  categoria: string;

// Cantidad disponible en stock (entero, inicia en 0)
  @Column({ type: 'int', default: 0 })
  stock: number;
}
