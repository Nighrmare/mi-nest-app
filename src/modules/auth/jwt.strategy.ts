/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

// Se importan las clases necesarias desde @nestjs/common
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Se importa PassportStrategy desde @nestjs/passport
// PassportStrategy, permite crear estrategias de autenticacion personalizadas
import { PassportStrategy } from '@nestjs/passport';

// Se importan las clases necesarias desde passport-jwt
// Strategy, implementa la estrategia JWT
// ExtractJwt, permite extraer el token JWT de la cabecera de autorizacion
import { Strategy, ExtractJwt } from 'passport-jwt';

// Se marca como inyectable para poder usarla en otras partes del proyecto
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {

// Se configura la estrategia JWT
// jwtFromRequest, indica que el token se tomara del encabezado "Authorization: Bearer <token>"
// ignoreExpiration false, si el token expira, se rechazara
// secretOrKey, clave secreta usada para firmar y verificar el token
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });

// Imprime la clave secreta 
    console.log('JWT_SECRET_KEY:', configService.get<string>('JWT_SECRET_KEY'));
  }

// Este metodo se ejecuta cuando un token es validado con exito
// payload, contiene los datos del usuario que se firmaron al generar el token
// Retorna la informacion del usuario
  async validate(payload: any) {

// Devuelve un objeto con el id y email del usuario extraidos del payload del token
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
