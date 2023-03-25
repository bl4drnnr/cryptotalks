import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    name: 'First name',
    type: 'string',
    nullable: true
  })
  firstName?: string;

  @ApiProperty({
    name: 'Last name',
    type: 'string',
    nullable: true
  })
  lastName?: string;

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

  @ApiProperty({
    name: 'Username',
    type: 'string',
    nullable: false
  })
  username: string;

  @ApiProperty({
    name: 'Twitter',
    type: 'string',
    nullable: true
  })
  twitter?: string;

  @ApiProperty({
    name: 'LinkedIn',
    type: 'string',
    nullable: true
  })
  linkedIn?: string;

  @ApiProperty({
    name: 'Personal website',
    type: 'string',
    nullable: true
  })
  personalWebsite?: string;

  @ApiProperty({
    name: 'Account title',
    type: 'string',
    nullable: true
  })
  title?: string;

  @ApiProperty({
    name: 'Biography',
    type: 'string',
    nullable: true
  })
  bio?: string;

  @ApiProperty({
    name: 'Terms and conditions',
    type: 'boolean',
    nullable: false
  })
  tac: boolean;

  @ApiProperty({
    name: 'Show personal email',
    type: 'boolean',
    nullable: true
  })
  publicEmail?: boolean;
}
