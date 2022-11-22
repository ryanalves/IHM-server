import { HttpException, HttpStatus } from '@nestjs/common';
export class RegistroNaoEncontradoException extends HttpException {
    constructor(data: {coluna: string, valor: any}) {
        super(`Registro com ${data.coluna} ${data.valor} não encontrado.`, HttpStatus.NOT_FOUND);
    }
}