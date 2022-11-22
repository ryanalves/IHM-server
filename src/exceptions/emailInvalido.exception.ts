import { HttpException, HttpStatus } from '@nestjs/common';
export class EmailInvalidoException extends HttpException {
    constructor(email: string) {
        super(`Email inválido/utilizado: ${email}`, HttpStatus.BAD_REQUEST);
    }
}