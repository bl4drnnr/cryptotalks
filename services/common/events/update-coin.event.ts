import { UpdateCoinEventDto } from '../event-dto/update-coin.event.dto';

export class UpdateCoinEvent {
  constructor(private readonly updateCoinEventPayload: UpdateCoinEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.updateCoinEventPayload
    });
  }
}
