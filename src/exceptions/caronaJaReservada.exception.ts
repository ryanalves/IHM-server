import { HttpException, HttpStatus } from '@nestjs/common';
export class CaronaJaReservadaException extends HttpException {
    constructor() {
        super(`A carona já foi reservada.`, HttpStatus.AMBIGUOUS);
    }
}