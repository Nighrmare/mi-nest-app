/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Se importan las clases necesarias desde @nestjs/common
// PipeTransform, interfaz base para crear Pipes
// Injectable, permite usar esta clase en otras partes del proyecto
// ArgumentMetadata, da info sobre el valor recibido 
// BadRequestException, este lanza error 400 si el valor no es valido
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// Permite que NestJS inyecte este pipe donde se necesite
@Injectable()
export class ParseUpperTrimPipe implements PipeTransform {

// Se ejecuta cada vez que el pipe procesa un valor (por ejemplo, en un @Param) 
  transform(value: any, metadata: ArgumentMetadata) {

// Si el valor es texto, se eliminan espacios y se convierte a mayusculas
    if (typeof value === 'string') {
      return value.trim().toUpperCase();
    }

// Si el valor es numero, se lanza un error 
// Porque este pipe solo acepta texto
    if (typeof value === 'number') {
      throw new BadRequestException('El valor tiene que ser STRING');
    }

// Si el valor no es texto ni numero (por ejemplo, un objeto), se devuelve tal cual
    return value;
  }
}


