import { ConfirmAccountEventDto } from '../event-dto/confirm-account-event.dto';

export class ConfirmAccountEvent {
  constructor(private readonly confirmAccountDto: ConfirmAccountEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.confirmAccountDto
    });
  }
}
