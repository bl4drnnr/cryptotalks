import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenEventDto {
  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  tokenId: string;
}
