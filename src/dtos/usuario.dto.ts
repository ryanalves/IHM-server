import { Type } from 'class-transformer';
import {
    IsString,
    IsEmail,
    MaxLength,
    IsNumber,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { Endereco } from 'src/entities/endereco.entity';
import { Motorista } from 'src/entities/usuario.entity';

export class UsuarioDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    nomeCompleto: string;

    @IsString()
    @MaxLength(255)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    telefone?: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsOptional()
    @Type(() => Motorista)
    @ValidateNested()
    motorista?: Motorista;

    @IsOptional()
    @Type(() => Endereco)
    @ValidateNested()
    endereco?: Endereco;
}

export class UsuarioEditarDto {
    @IsString()
    @MaxLength(255)
    @IsOptional()
    nomeCompleto?: string;

    @IsString()
    @MaxLength(255)
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    telefone?: string;

    @IsOptional()
    @Type(() => Motorista)
    @ValidateNested()
    motorista?: Motorista;

    @IsOptional()
    @Type(() => Endereco)
    @ValidateNested()
    endereco?: Endereco;
}
