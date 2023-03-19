import { ForbiddenException } from '@nestjs/common';

export class AccountNotConfirmedException extends ForbiddenException {
  constructor() {
    super('account-not-confirmed', 'Account not confirmed');
  }
}
