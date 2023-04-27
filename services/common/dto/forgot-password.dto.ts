import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    type: String,
    nullable: true
  })
  email?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  phone?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  verificationString: string;
}
