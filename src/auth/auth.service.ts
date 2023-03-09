import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './constants';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        @Inject(JwtService)
        private jwtService: JwtService,
    ) {}

    async autenticar(email: string, senha: string): Promise<Usuario> {
        const usuario = await this.usuarioService.buscarEmail(email, true);
        try {
            if (usuario) {
                const value = await bcrypt.compare(senha, usuario.senha);
                if (value || senha == usuario.senha) {
                    return usuario;
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    async login(usuario: Usuario) {
        const payload: JwtPayload = {
            email: usuario.email,
            id: usuario.id,
        };
        return {
            email: usuario.email,
            nome: usuario.nomeCompleto,
            cnh: usuario?.motorista?.cnh,
            access_token: this.jwtService.sign(payload),
        };
    }
}
