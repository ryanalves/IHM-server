import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    endereco: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    numero: string;

    @Column()
    cep: string;
}
