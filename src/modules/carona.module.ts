import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CaronaController } from '../controllers/carona.controller';
import { Carona } from '../entities/carona.entity';
import { Usuario } from '../entities/usuario.entity';
import { CaronaService } from '../services/carona.service';

@Module({
    imports: [TypeOrmModule.forFeature([Carona, Usuario]), AuthModule],
    controllers: [CaronaController],
    providers: [CaronaService],
    exports: [CaronaService],
})
export class CaronaModule {}
