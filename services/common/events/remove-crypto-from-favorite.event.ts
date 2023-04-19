import { ApiProperty } from '@nestjs/swagger';

export class RemoveCryptoToFavoriteEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  cryptoId: string;
}

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
