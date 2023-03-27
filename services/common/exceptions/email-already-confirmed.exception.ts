import { ForbiddenException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class EmailAlreadyConfirmedException extends RpcException {
  constructor() {
    super(
      new ForbiddenException(
        'email-already-confirmed',
        'Email address already confirmed'
      )
    );
  }
}
