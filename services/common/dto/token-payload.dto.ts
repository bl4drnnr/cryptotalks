import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  id: string;

  @ApiProperty({
    type: 'access | refresh',
    nullable: false
  })
  type: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  userId: string;
}
