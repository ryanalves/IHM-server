import { HttpException, HttpStatus } from '@nestjs/common';
export class UsuarioMotoristaException extends HttpException {
    constructor() {
        super(`Você é o motorista da carona.`, HttpStatus.AMBIGUOUS);
    }
}