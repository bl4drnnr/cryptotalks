import { CloseAccEventDto } from '../event-dto/close-acc.event.dto';

export class CloseAccEvent {
  constructor(private readonly closeAccPayload: CloseAccEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.closeAccPayload
    });
  }
}
