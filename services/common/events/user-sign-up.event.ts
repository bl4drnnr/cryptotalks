import { ApiProperty } from '@nestjs/swagger';

export class SignUpEventDto {
  @ApiProperty({
    type: String,
    nullable: true
  })
  confirmationHash?: string;

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
  confirmationType?: 'REGISTRATION';

  @ApiProperty({
    type: String,
    nullable: true
  })
  email?: string;
}

export class UserSignUpEvent {
  constructor(private readonly createUserPayload: SignUpEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.createUserPayload
    });
  }
}
