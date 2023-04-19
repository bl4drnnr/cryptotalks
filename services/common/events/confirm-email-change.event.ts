import { ConfirmAccountEventDto } from './confirm-account.event';

export class ConfirmEmailChangeEvent {
  constructor(private readonly confirmEmailPayload: ConfirmAccountEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.confirmEmailPayload
    });
  }
}
