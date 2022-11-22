import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioDto } from 'src/dtos/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    public async criar(@Body() body: UsuarioDto): Promise<{ id: number }> {
        try {
            const usuario = await this.usuarioService.criar(body);
            return { id: usuario.id };
        } catch (error) {
            throw error;
        }
    }
}
