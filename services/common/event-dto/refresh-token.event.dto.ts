import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenEventDto {
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
  tokenId: string;
}
