import { RpcException } from '@nestjs/microservices';
import { NotFoundException } from '@nestjs/common';

export class WrongCredentialsException extends RpcException {
  constructor() {
    const notFoundException = new NotFoundException('wrong-credentials', 'Wrong credentials');
    super({ error: notFoundException });
  }
}
