/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

// Se define el servicio principal de la aplicacion 
@Injectable()
export class AppService {

// Metodo que retorna un mensaje
  getHello(): string {
    return 'Hello World!';
  }

// Metodo que retorna el estado actual de la aplicacion
// Incluye un campo "status" y la hora actual en formato ISO
  getStatus(): { status: string; time: Date | string } {
    return { status: 'ok', time: new Date().toISOString() };
  }
}
