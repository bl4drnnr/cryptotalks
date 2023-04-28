import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(message = 'user-not-found', description = 'User not found') {
    super(message, description);
  }
}
