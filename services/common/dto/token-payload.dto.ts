import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty({
    name: 'Id',
    type: 'string',
    nullable: false
  })
  id: string;

  @ApiProperty({
    name: 'Token type',
    type: 'access | refresh',
    nullable: false
  })
  type: string;

  @ApiProperty({
    name: 'User Id',
    type: 'string',
    nullable: false
  })
  userId: string;
}
