import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Motorista, Usuario } from './usuario.entity';

@Entity()
export class Carona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    saida: string;

    @Column()
    saidaHorario: Date;

    @Column()
    chegada: string;

    @Column()
    chegadaHorario: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valor: number;

    @ManyToOne(() => Usuario, (motorista: Usuario) => motorista.caronaOfertada)
    motorista?: Usuario;

    @ManyToMany(() => Usuario)
    @JoinTable()
    passageiros: Usuario[];
}
