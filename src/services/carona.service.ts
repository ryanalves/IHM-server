import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carona } from 'src/entities/carona.entity';
import { Motorista, Usuario } from 'src/entities/usuario.entity';
import { CaronaJaReservadaException } from 'src/exceptions/caronaJaReservada.exception';
import { UsuarioMotoristaException } from 'src/exceptions/usuarioMotorista.exception';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CaronaService {
    constructor(
        @InjectRepository(Carona)
        private caronaRepository: Repository<Carona>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    find(options?: FindManyOptions) {
        return this.caronaRepository.find(options);
    }

    findOne(options?: any) {
        return this.caronaRepository.findOne(options);
    }

    create(carona: any, userId: number) {
        let caronaDoc = new Carona();
        caronaDoc.chegada = carona.chegada;
        caronaDoc.chegadaHorario = carona.chegadaHorario;
        caronaDoc.saida = carona.saida;
        caronaDoc.saidaHorario = carona.saidaHorario;
        caronaDoc.valor = carona.valor;
        caronaDoc.motorista = new Usuario();
        caronaDoc.motorista.id = userId;

        return this.caronaRepository.save(caronaDoc);
    }

    async reservar(caronaId: number, userId: number) {
        let carona = await this.caronaRepository.findOne({
            where: { id: caronaId },
            relations: {
                motorista: true,
                passageiros: true,
            }
        });
        let usuario = await this.usuarioRepository.findOne({
            where: { id: userId },
        });
        
        if (carona.motorista.id == userId) {
            throw new UsuarioMotoristaException();
        }
        if (carona.passageiros.find((u: Usuario) => u.id == userId)) {
            throw new CaronaJaReservadaException();
        }
        carona.passageiros.push(usuario);
        this.caronaRepository.save(carona);
        return carona;
    }
}
