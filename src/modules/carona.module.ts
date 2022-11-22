import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaronaController } from 'src/controllers/carona.controller';
import { Carona } from 'src/entities/carona.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { CaronaService } from 'src/services/carona.service';

@Module({
    imports: [TypeOrmModule.forFeature([Carona, Usuario])],
    controllers: [CaronaController],
    providers: [CaronaService],
    exports: [CaronaService],
})
export class CaronaModule {}
