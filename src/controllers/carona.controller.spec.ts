import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../services/usuario.service';
import { CaronaService } from '../services/carona.service';
import { CaronaController } from './carona.controller';
import { Usuario } from '../entities/usuario.entity';
import { Carona } from '../entities/carona.entity';

class CaronaServiceMock {
    caronas: Carona[] = [];

    async create(carona: any, userId: number) {
        if (!userId) throw new Error('motorista_nao_encontrado');

        let caronaDoc = new Carona();
        caronaDoc.chegada = carona.chegada;
        caronaDoc.chegadaHorario = carona.chegadaHorario;
        caronaDoc.saida = carona.saida;
        caronaDoc.saidaHorario = carona.saidaHorario;
        caronaDoc.valor = carona.valor;
        caronaDoc.motorista = new Usuario();
        caronaDoc.motorista.id = userId;

        this.caronas.push(caronaDoc);
        return caronaDoc;
    }
}
const caronaServiceMock = new CaronaServiceMock();
const usuarioServiceMock = {};

describe('CaronaController', () => {
    let controller: CaronaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CaronaController],
            providers: [
                {
                    provide: CaronaService,
                    useValue: caronaServiceMock,
                },
                {
                    provide: UsuarioService,
                    useValue: usuarioServiceMock,
                },
            ],
        }).compile();

        controller = module.get<CaronaController>(CaronaController);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    test('criar carona', async () => {
        // Criar usuario de teste
        let user = new Usuario();
        user.id = 1;
        user.email = 'test@email.com';

        // Ciar carona de teste
        let caronaData = {
            saida: 'Centro - timoteo',
            saidaHorario: new Date('2024-12-12 19:00'),
            chegada: 'Unileste - coronel fabriciano',
            chegadaHorario: new Date('2024-12-12 19:30'),
            valor: 6.5,
        };

        let carona = await controller.create(caronaData, { user });
        expect(carona).toBeDefined();
    });

    test('falhar em criar carona sem motorista', async () => {
        // Ciar carona de teste
        let caronaData = {
            saida: 'Centro - timoteo',
            saidaHorario: new Date('2024-12-12 19:00'),
            chegada: 'Unileste - coronel fabriciano',
            chegadaHorario: new Date('2024-12-12 19:30'),
            valor: 6.5,
        };

        let carona = controller.create(caronaData, { user: null });
        // expect(carona).toBeDefined();
        expect(carona).rejects.toThrowError('motorista_nao_encontrado');
    });
});
