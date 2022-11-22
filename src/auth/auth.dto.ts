import {
    IsString,
    IsEmail,
    IsNotEmpty,
} from 'class-validator';

export class AuthDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
}