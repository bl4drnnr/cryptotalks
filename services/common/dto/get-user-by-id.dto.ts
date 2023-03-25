import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  id: string;
}
