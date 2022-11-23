import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Carona } from './carona.entity';
import { Endereco } from './endereco.entity';

export class Motorista {

    @Column()
    cnh: string;

    @Column()
    modeloVeiculo: string;

    @Column()
    placaVeiculo: string;
}

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column(() => Motorista)
    motorista: Motorista;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    nomeCompleto: string;

    @Column()
    senha: string;

    @Column()
    termos: boolean;

    @OneToOne((type) => Endereco)
    @JoinColumn()
    endereco: Endereco;

    @OneToMany(() => Carona, (carona) => carona.motorista)
    caronaOfertada?: Carona[];
}
