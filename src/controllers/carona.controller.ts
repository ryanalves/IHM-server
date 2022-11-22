import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Carona } from 'src/entities/carona.entity';
// import { CaronaDto } from 'src/dtos/carona.dto';
import { CaronaService } from 'src/services/carona.service';
import { Like, MoreThanOrEqual } from 'typeorm';

@Controller('carona')
export class CaronaController {
    constructor(private readonly caronaService: CaronaService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    public async create(@Body() carona: any, @Req() req: any) {
        return await this.caronaService.create(carona, +req?.user?.id);
    }

    @Post('find')
    public async getAll(@Body() options: any) {
        console.log(options);

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
        let caronas = await this.caronaService.find({
            where: _options,
            order: _order,
            relations: {
                motorista: true,
            },
        });
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
                passageiros: true
            },
        });
        return carona;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('reservar/:caronaId')
    public async reservarCarona(@Req() req:any, @Param('caronaId') caronaId: string) {
        let carona = await this.caronaService.reservar(+caronaId, +req.user.id);
        return carona;
    }


    // @Post()
    // public async criar(@Body() body: CaronaDto): Promise<{ id: number }> {
    //     try {
    //         const carona = await this.caronaService.criar(body);
    //         // console.log(body);
    //         return { id: carona.id };
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
