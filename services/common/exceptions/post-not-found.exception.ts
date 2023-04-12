import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(message = 'post-not-found', description = 'Post not found') {
    super(message, description);
  }
}
