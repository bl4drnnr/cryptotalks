import { UnauthorizedException } from '@nestjs/common';

export class CorruptedTokenException extends UnauthorizedException {
  constructor() {
    super('corrupted-token', 'Corrupted token');
  }
}
