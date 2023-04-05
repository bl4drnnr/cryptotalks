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
}
