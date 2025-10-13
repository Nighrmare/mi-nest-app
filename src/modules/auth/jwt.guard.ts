/* eslint-disable prettier/prettier */

// Se importan las clases necesarias desde @nestjs/common
// Injectable, permite usar esta clase en otras partes del proyecto
import { Injectable } from '@nestjs/common';

// Se importa AuthGuard desde @nestjs/passport
// AuthGuard, permite conectar con las estrategias de autenticacion 
import { AuthGuard } from '@nestjs/passport';

// Se marca como inyectable para poder usarla en otras partes del proyecto
@Injectable()

// Se extiende AuthGuard con la estrategia 'jwt' para proteger rutas usando JWT
export class JwtAuthGuard extends AuthGuard('jwt') {}
