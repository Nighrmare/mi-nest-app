/* eslint-disable prettier/prettier */

// Se importan los decoradores y Excepciones necesarias
import { Injectable, NotFoundException } from '@nestjs/common';

// Se importa Repository para interactuar con la base de datos
import { Repository } from 'typeorm';

// Se importa InjectRepository para inyectar el repositorio de la entidad Product
import { InjectRepository } from '@nestjs/typeorm';

// Se importa la entidad Product 
import { Product } from '../../entities/product.entity';

// se importan los DTOs que validan los datos de la creacion y actualizacion de productos
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

// Se define el servicio de productos y se marca como inyectable 
@Injectable()
export class ProductsService {

// Inyeccion del repositorio de la entidad Product
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

// Metodo para obtener todos los productos activos (estado true)
// findAll devuelve todos los productos activos en la base de datos
// Filtra los datos para retornar solo los productos con estado true
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ where: { estado: true } });
  }

// Metodo para obtener un producto por su ID
// findOne busca un producto por su id si no lo encuentra lanza una excepcion NotFoundException
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

// Metodo para obtener un producto por su nombre
// findByName busca un producto por su nombre ignorando mayusculas y minusculas
// Si no lo encuentra lanza una excepcion NotFoundException
  async findByName(name: string): Promise<Product> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .where('UPPER(product.nombre) = :name', { name })
      .getOne();

    if (!product) {
      throw new NotFoundException(
        `Producto con nombre "${name}" no encontrado`,
      );
    }

    return product;
  }

// Metodo para crear un nuevo producto
// create crea un nuevo registro en la base de datos con los datos validados por CreateProductDTO
  async create(data: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(data);
    return await this.productRepository.save(newProduct);
  }

// Metodo para actualizar un producto
// update actualiza un producto si no lo encuentra lanza una excepcion NotFoundException
  async update(id: number, data: UpdateProductDTO): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, data);
    await this.productRepository.save(product);
    return await this.findOne(id);
  }

// Metodo para desactivar un producto (cambiar estado a false)
// disabled cambia el estado del producto a false sin eliminar el registro
// Si no lo encuentra lanza una excepcion NotFoundException
  async disabled(id: number): Promise<{ message: string; product: Product }> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (!product.estado) {
      throw new NotFoundException(
        `El producto con id ${id} ya está desactivado`,
      );
    }

// Cambia el estado del producto y lo guarda en la base de datos 
    product.estado = false;
    await this.productRepository.save(product);

// Devuelve un mensaje con los datos actualizados del producto
    return {
      message: `Producto ${id} desactivado correctamente`,
      product,
    };
  }
}
