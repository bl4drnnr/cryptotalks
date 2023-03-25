import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokensDto {
  @ApiProperty({
    name: 'User Id',
    type: 'string',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    name: 'Email',
    type: 'string',
    nullable: false
  })
  email: string;
}
