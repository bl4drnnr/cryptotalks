import { ForbiddenException } from '@nestjs/common';

export class WrongCredentialsException extends ForbiddenException {
  constructor(
    message = 'wrong-credentials',
    description = 'Wrong credentials'
  ) {
    super(message, description);
  }
}
