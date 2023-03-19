import { UnauthorizedException } from '@nestjs/common';

export class ExpiredTokenException extends UnauthorizedException {
  constructor() {
    super('token-expired', 'Token expired');
  }
}
