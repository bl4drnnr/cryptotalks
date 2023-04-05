import { ApiProperty } from '@nestjs/swagger';

export class AddCryptoToFavoriteEventDto {
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
