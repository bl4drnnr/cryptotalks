import { RemoveCryptoToFavoriteEventDto } from '../event-dto/remove-crypto-from-favorite.event.dto';

export class RemoveCryptoToFavoriteEvent {
  constructor(
    private readonly removeCryptoToFavoritePayload: RemoveCryptoToFavoriteEventDto
  ) {}

  toString() {
    return JSON.stringify({
      ...this.removeCryptoToFavoritePayload
    });
  }
}
