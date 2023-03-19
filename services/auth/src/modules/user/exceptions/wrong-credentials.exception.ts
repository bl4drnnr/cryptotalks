import { ForbiddenException } from '@nestjs/common';

export class WrongCredentialsException extends ForbiddenException {
  constructor() {
    super('wrong-credentials', 'Wrong credentials');
  }
}
