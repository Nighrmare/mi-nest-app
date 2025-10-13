/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Se define el controlador principal de la aplicacion 
@Controller()
export class AppController {

// Se inyecta el servicio AppService
  constructor(private readonly appService: AppService) {}

// GET /
// Devuelve un mensaje 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

// GET /status
// Devuelve el estado actual de la aplicacion
  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}
