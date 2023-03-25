import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    name: 'Email',
    type: 'string',
    nullable: false
  })
  email: string;

  @ApiProperty({
    name: 'Password',
    type: 'string',
    nullable: false
  })
  password: string;
}
