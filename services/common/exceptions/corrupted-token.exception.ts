import { UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class CorruptedTokenException extends RpcException {
  constructor() {
    super(new UnauthorizedException('corrupted-token', 'Corrupted token'));
  }
}
