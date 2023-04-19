import { BadRequestException } from '@nestjs/common';

export class EmailChangeConfirmedException extends BadRequestException {
  constructor(
    message = 'email-change-confirmed',
    description = 'Email address change already confirmed'
  ) {
    super(message, description);
  }
}
