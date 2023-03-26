import { ForbiddenException } from '@nestjs/common';

export class UserAlreadyExistsException extends ForbiddenException {
  constructor() {
    super('user-already-exists', 'User already exists');
  }
}
