/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

export class ArquivoInexistenteException extends HttpException {
    constructor(filename: string, context: 'temp' | 'uploads' = 'uploads') {
        super(`Arquivo ${filename} inexistente em /${context}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
