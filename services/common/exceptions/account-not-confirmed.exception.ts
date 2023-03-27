import { ForbiddenException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class AccountNotConfirmedException extends RpcException {
  constructor() {
    super(
      new ForbiddenException('account-not-confirmed', 'Account not confirmed')
    );
  }
}
