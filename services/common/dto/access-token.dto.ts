import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  email: string;
}