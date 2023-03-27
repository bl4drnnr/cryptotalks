import { RpcException } from '@nestjs/microservices';
import { NotFoundException } from '@nestjs/common';

export class HashNotFoundException extends RpcException {
  constructor() {
    super(new NotFoundException('hash-not-found', 'Hash not found'));
  }
}
