import { NotFoundException } from '@nestjs/common';

export class HashNotFoundException extends NotFoundException {
  constructor() {
    super('hash-not-found', 'Hash not found');
  }
}
