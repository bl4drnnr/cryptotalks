import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    type: 'string',
    nullable: true
  })
  firstName?: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  lastName?: string;

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

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  username: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  twitter?: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  linkedIn?: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  personalWebsite?: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  title?: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  bio?: string;

  @ApiProperty({
    type: 'boolean',
    nullable: false
  })
  tac: boolean;

  @ApiProperty({
    type: 'boolean',
    nullable: true
  })
  publicEmail?: boolean;
}
