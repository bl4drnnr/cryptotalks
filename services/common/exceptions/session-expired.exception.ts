import { UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class SessionHasExpiredException extends RpcException {
  constructor() {
    super(
      new UnauthorizedException('session-has-expired', 'Session has expired')
    );
  }
}
