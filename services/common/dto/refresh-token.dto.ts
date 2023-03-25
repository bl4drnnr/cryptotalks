import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    name: 'User Id',
    type: 'string',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    name: 'Token Id',
    type: 'string',
    nullable: false
  })
  tokenId: string;
}
