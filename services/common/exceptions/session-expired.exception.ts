import { UnauthorizedException } from '@nestjs/common';

export class SessionHasExpiredException extends UnauthorizedException {
  constructor(
    message = 'session-has-expired',
    description = 'Session has expired'
  ) {
    super(message, description);
  }
}
