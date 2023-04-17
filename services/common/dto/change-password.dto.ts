import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  password: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  passwordRepeat: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  twoFaCode?: string;
}
