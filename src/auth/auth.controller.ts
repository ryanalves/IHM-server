import {
    Controller,
    Get,
    Post,
    Body,
    Inject,
    UseGuards,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioDto, UsuarioEditarDto } from 'src/dtos/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { CredenciaisInvalidasException } from '../exceptions/credenciaisInvalidas.exception';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
    constructor(
        @Inject(AuthService)
        private authService: AuthService,
        @Inject(UsuarioService)
        private usuarioService: UsuarioService,
    ) {}

    @Post('login')
    async login(@Body() body: AuthDto) {
        const usuario = await this.authService.autenticar(
            body.email,
            body.senha,
        );
        if (usuario) {
            return this.authService.login(usuario);
        } else {
            throw new CredenciaisInvalidasException();
        }
    }

    @Post('cadastro')
    async cadastro(@Body() body: UsuarioDto) {
        const usuario = await this.usuarioService.criar(body);
        if (usuario) {
            return this.authService.login(usuario);
        } else {
            throw new CredenciaisInvalidasException();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('editar')
    async editar(@Req() req: any, @Body() body: UsuarioEditarDto) {
        const usuario = await this.usuarioService.editar(req.user.id, body);
        if (usuario) {
            return this.authService.login(usuario);
        } else {
            throw new CredenciaisInvalidasException();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async buscarUsuario(@Req() req: any) {
        const usuario = await this.usuarioService.buscar(
            {
                id: req.user.id,
            },
            true,
        );
        usuario.senha = undefined;
        return usuario;
    }
}
