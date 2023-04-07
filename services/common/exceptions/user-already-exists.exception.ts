import { ForbiddenException } from '@nestjs/common';

export class UserAlreadyExistsException extends ForbiddenException {
  constructor(
    message = 'user-already-exists',
    description = 'User already exists'
  ) {
    super(message, description);
  }
}
