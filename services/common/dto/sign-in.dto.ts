import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  email: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  password: string;
}
