import { BadRequestException } from '@nestjs/common';

export class EmailChangedException extends BadRequestException {
  constructor() {
    super('email-already-changed', 'Email has been already changed');
  }
}
