import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  email: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  twoFaCode?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;
}
