import { ForbiddenException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class TacNotAcceptedException extends RpcException {
  constructor() {
    super(new ForbiddenException('tac-not-accepted', 'T&C is not accepted'));
  }
}
