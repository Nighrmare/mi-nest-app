/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Funcion principal que inicia el servidor
async function bootstrap() {

// Se crea una instancia de la aplicacion basada en el modulo principal AppModule
  const app = await NestFactory.create(AppModule);

// Se configuran los pipes globales de validacion
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en los DTOs
      transform: true, // convierte los tipos automáticamente según el DTO
      transformOptions: { enableImplicitConversion: true }, // permite conversiones automaticas sin decoradores explicitos
    }),
  );

// Se define el puerto de la aplicacion
// Si no se define en .env, se usa 3000 por defecto 
  const port = process.env.PORT || 3000;

// Se inicia la aplicacion y se escucha en el puerto indicado
  await app.listen(port);

// Mensaje de consola indicando que la aplicacion esta corriendo
  console.log(`Application is running on: http://localhost:${port}`);
}

// Se ejecuta la funcion bootstrap
void bootstrap();
