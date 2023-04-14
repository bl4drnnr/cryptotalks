import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  email: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  password: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  twoFaCode?: string;
}
