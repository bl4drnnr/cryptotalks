import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  tokenId: string;
}
