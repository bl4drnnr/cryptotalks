import { NotFoundException } from '@nestjs/common';

export class WrongCredentialsException extends NotFoundException {
  constructor(
    message = 'wrong-credentials',
    description = 'Wrong credentials'
  ) {
    super(message, description);
  }
}
