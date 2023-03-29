import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  tokenId: string;
}
