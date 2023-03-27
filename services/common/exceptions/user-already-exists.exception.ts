import { ForbiddenException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class UserAlreadyExistsException extends RpcException {
  constructor() {
    super(new ForbiddenException('user-already-exists', 'User already exists'));
  }
}
