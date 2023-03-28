import { NotFoundException } from '@nestjs/common';

export class WrongCredentialsException extends NotFoundException {
  constructor() {
    super('wrong-credentials', 'Wrong credentials');
  }
}
