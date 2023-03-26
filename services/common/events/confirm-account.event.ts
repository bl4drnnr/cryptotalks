import { AccountConfirmationDto } from '../dto/account-confirmation.dto';

export class ConfirmAccountEvent {
  constructor(private readonly confirmAccountDto: AccountConfirmationDto) {}

  toString() {
    return JSON.stringify({
      ...this.confirmAccountDto
    });
  }
}
