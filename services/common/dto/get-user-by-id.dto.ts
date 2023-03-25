import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdDto {
  @ApiProperty({
    name: 'User Id',
    type: 'string',
    nullable: false
  })
  id: string;
}
