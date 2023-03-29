import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  email: string;
}
