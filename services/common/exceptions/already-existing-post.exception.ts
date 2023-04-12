import { BadRequestException } from '@nestjs/common';

export class AlreadyExistingPostException extends BadRequestException {
  constructor(
    message = 'post-already-exists',
    description = 'Post with such title already exists'
  ) {
    super(message, description);
  }
}
