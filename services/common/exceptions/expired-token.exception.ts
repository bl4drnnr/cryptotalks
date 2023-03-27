import { UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ExpiredTokenException extends RpcException {
  constructor() {
    super(new UnauthorizedException('token-expired', 'Token expired'));
  }
}
