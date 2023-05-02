import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  email?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  password?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  bio?: string;

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
  twitter?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  username?: string;

  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Base64 string describing photo'
  })
  photo?: string;
}

export class UpdateUserEvent {
  constructor(private readonly updateUserPayload: UpdateUserEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.updateUserPayload
    });
  }
}
