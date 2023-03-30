import { ApiProperty } from '@nestjs/swagger';

export class RemoveCryptoToFavoriteEventDto {
  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  cryptoId: string;
}
