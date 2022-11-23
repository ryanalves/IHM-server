import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Endereco } from 'src/entities/endereco.entity';
import { UsuarioService } from 'src/services/usuario.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        TypeOrmModule.forFeature([Usuario, Endereco])
    ],
    providers: [AuthService, UsuarioService, JwtStrategy],
    exports: [AuthService, UsuarioService],
    controllers: [AuthController],
})
export class AuthModule {}
