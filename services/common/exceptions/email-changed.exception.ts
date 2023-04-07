import { BadRequestException } from '@nestjs/common';

export class EmailChangedException extends BadRequestException {
  constructor(
    message = 'email-already-changed',
    description = 'Email has been already changed'
  ) {
    super(message, description);
  }
}
