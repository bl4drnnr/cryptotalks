import { UpdateTokensDto } from '../dto/update-tokens.dto';

export class UpdateTokensEvent {
  constructor(private readonly updateTokenPayload: UpdateTokensDto) {}

  toString() {
    return JSON.stringify({
      ...this.updateTokenPayload
    });
  }
}
