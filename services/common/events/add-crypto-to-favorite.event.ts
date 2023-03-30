import { AddCryptoToFavoriteEventDto } from '../event-dto/add-crypto-to-favorite.event.dto';

export class AddCryptoToFavoriteEvent {
  constructor(
    private readonly addCryptoToFavoritePayload: AddCryptoToFavoriteEventDto
  ) {}

  toString() {
    return JSON.stringify({
      ...this.addCryptoToFavoritePayload
    });
  }
}
