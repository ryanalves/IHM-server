import { HttpException, HttpStatus } from '@nestjs/common';
export class CredenciaisInvalidasException extends HttpException {
    constructor() {
        super(`Email/senha inválidos`, HttpStatus.UNAUTHORIZED);
    }
}