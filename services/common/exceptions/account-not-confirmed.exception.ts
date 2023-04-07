import { ForbiddenException } from '@nestjs/common';

export class AccountNotConfirmedException extends ForbiddenException {
  constructor(
    message = 'account-not-confirmed',
    description = 'Account not confirmed'
  ) {
    super(message, description);
  }
}
