import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Req,
    Param,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorator/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { CaronaDto } from 'src/dtos/carona.dto';
import { CaronaService } from 'src/services/carona.service';
import { UsuarioService } from 'src/services/usuario.service';
import { In, Like, MoreThanOrEqual } from 'typeorm';

@Controller('carona')
export class CaronaController {
    constructor(
        private readonly caronaService: CaronaService,
        private usuarioService: UsuarioService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    public async create(@Body() carona: any, @Req() req: any) {
        return await this.caronaService.create(carona, +req?.user?.id);
    }

    @Post('find')
    public async getAll(@Body() options: any) {
        let _options: any = {};
        if (options.futuro) {
            _options.saidaHorario = MoreThanOrEqual(new Date());
        }
        if (options.saida) {
            _options.saida = Like(`%${options.saida}%`);
        }
        if (options.chegada) {
            _options.chegada = Like(`%${options.chegada}%`);
        }
        let _order: any = {};
        if (options.filtro) {
            switch (options.filtro) {
                case 'saidaCedo':
                    _order.saidaHorario = 1;
                    break;
                case 'saidaTarde':
                    _order.saidaHorario = -1;
                    break;
                case 'precoBaixo':
                    _order.valor = 1;
                    break;
                case 'precoAlto':
                    _order.valor = -1;
                    break;

                default:
                    break;
            }
        }

        if (options.caronas) {
            let usuario = await this.usuarioService.buscar({
                email: options.caronas,
            });
            _options.motorista = usuario;
        }
        if (options.reservas) {
            let usuario = await this.usuarioService.buscar({
                email: options.reservas,
            });
            _options.passageiros = usuario;
        }

        let caronas = await this.caronaService.find({
            where: _options,
            order: _order,
            relations: {
                motorista: true,
                passageiros: true,
            },
        });

        if (options.vagas) {
            return caronas.filter(
                (carona) => 4 - carona.passageiros.length >= options.vagas,
            );
        }
        return caronas;
    }

    @Get(':id')
    public async getCarona(@Param('id') id: string) {
        let carona = await this.caronaService.findOne({
            where: {
                id: +id,
            },
            relations: {
                motorista: true,
                passageiros: true,
            },
        });
        return carona;
    }

    @UseGuards(JwtAuthGuard)
    @Post('reservar/:caronaId')
    public async reservarCarona(
        @Req() req: any,
        @Param('caronaId') caronaId: string,
    ) {
        let carona = await this.caronaService.reservar(+caronaId, +req.user.id);
        return carona;
    }
}
