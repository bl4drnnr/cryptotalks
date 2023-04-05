import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    type: String,
    nullable: true
  })
  firstName?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  lastName?: string;

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
    nullable: false
  })
  username: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  twitter?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  linkedIn?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  personalWebsite?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  title?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  bio?: string;

  @ApiProperty({
    type: Boolean,
    nullable: false
  })
  tac: boolean;

  @ApiProperty({
    type: Boolean,
    nullable: true
  })
  publicEmail?: boolean;
}
