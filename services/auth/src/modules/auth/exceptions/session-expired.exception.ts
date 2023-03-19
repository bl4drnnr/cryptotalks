import { UnauthorizedException } from '@nestjs/common';

export class SessionHasExpiredException extends UnauthorizedException {
  constructor() {
    super('session-has-expired', 'Session has expired');
  }
}
