import { ForbiddenException } from '@nestjs/common';

export class EmailAlreadyConfirmedException extends ForbiddenException {
  constructor() {
    super('email-already-confirmed', 'Email address already confirmed');
  }
}
