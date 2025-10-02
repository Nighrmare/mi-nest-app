import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      nombre: 'Laptop',
      descripcion: 'Laptop gamer',
      precio: 3500,
      categoria: 'Electrónicos',
      stock: 10,
    },
    {
      id: 2,
      nombre: 'Silla ergonómica',
      descripcion: 'Silla de oficina con soporte lumbar',
      precio: 500,
      categoria: 'Muebles',
      stock: 25,
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  create(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, product: Partial<Product>): Product {
    const existing = this.findOne(id);
    const updated = { ...existing, ...product };
    this.products = this.products.map((p) => (p.id === id ? updated : p));
    return updated;
  }

  remove(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    this.products.splice(index, 1);
  }
}
