import { UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class InvalidTokenException extends RpcException {
  constructor() {
    super(new UnauthorizedException('invalid-token', 'Invalid token'));
  }
}
