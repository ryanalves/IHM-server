import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioDto, UsuarioEditarDto } from 'src/dtos/usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { RegistroExistenteException } from 'src/exceptions/registroexistente.exception';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Endereco } from 'src/entities/endereco.entity';
import { RegistroNaoEncontradoException } from 'src/exceptions/registroNaoEncontrado.exception';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        @InjectRepository(Endereco)
        private enderecoRepository: Repository<Endereco>,
    ) {}

    async buscar(
        where: FindOptionsWhere<Usuario>,
        loadRelations: boolean = false,
    ) {
        let relations: any = {};
        if (loadRelations) {
            relations.endereco = true;
        }
        return await this.usuarioRepository.findOne({
            where,
            relations,
        });
    }

    async buscarEmail(email: string, relations: boolean = false) {
        return await this.usuarioRepository.findOne({
            where: {
                email,
            },
        });
    }

    async criar(body: UsuarioDto): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                email: body.email,
            },
        });
        if (usuario) {
            throw new RegistroExistenteException({
                coluna: 'email',
                valor: body.email,
            });
        }
        const salt = await bcrypt.genSalt();
        const senha = await bcrypt.hash(body.senha, salt);
        body.senha = senha;

        let endereco: any;
        if (body.endereco) {
            endereco = await this.enderecoRepository.save(body.endereco);
            body.endereco = endereco;
        }

        let u = await this.usuarioRepository.save(body);

        return await this.usuarioRepository.findOne({
            where: {
                id: u.id,
            },
        });
    }

    async editar(userId: number, body: UsuarioEditarDto): Promise<Usuario> {
 
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                endereco: true
            }
        });
        if (!usuario) {
            throw new RegistroNaoEncontradoException({
                coluna: 'id',
                valor: userId,
            });
        }

        let endereco = body.endereco;
        body.endereco = undefined;
        this.usuarioRepository.update({id: userId}, body);
        if (usuario?.endereco?.id && endereco) {
            await this.enderecoRepository.update({id: usuario.endereco.id}, endereco);
        }
        
        return await this.usuarioRepository.findOne({
            where: {
                id: userId,
            },
        });
    }
}
