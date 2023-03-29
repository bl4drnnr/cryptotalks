import { RefreshTokenEventDto } from '../event-dto/refresh-token-event.dto';

export class RefreshTokensEvent {
  constructor(private readonly refreshTokensPayload: RefreshTokenEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.refreshTokensPayload
    });
  }
}
