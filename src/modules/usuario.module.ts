import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from 'src/controllers/usuario.controller';
import { Endereco } from 'src/entities/endereco.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuarioService } from 'src/services/usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario, Endereco])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuarioModule {}
