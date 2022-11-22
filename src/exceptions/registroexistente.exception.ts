/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

import { HttpException, HttpStatus } from '@nestjs/common';

interface Props {
  coluna: string;
  valor: any;
}

export class RegistroExistenteException extends HttpException {
  constructor(data: Props | Props[]) {
    if(Array.isArray(data)){
      const info = data.map((item, index) => `${item.coluna} ${item.valor}` + (index < (data.length - 1) ? ' e ' : ''));
      super(`Registro já existente com o(a) ${info}`, HttpStatus.CONFLICT);
    } else {
      super(`Registro já existente com o(a) ${data.coluna} ${data.valor}`, HttpStatus.CONFLICT);
    }
  }
}
