import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  id: string;

  @ApiProperty({
    type: 'access | refresh',
    nullable: false
  })
  type: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  userId: string;
}
