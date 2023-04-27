import { ApiProperty } from '@nestjs/swagger';

export class SendVerificationEmailEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  email: string;
  confirmationHash: string;
  confirmationType: 'EMAIL_CHANGE' | 'REGISTRATION' | 'FORGOT_PASSWORD';
  userId: string;
}

export class SendVerificationEmailEvent {
  constructor(
    private readonly sendVerificationEmailPayload: SendVerificationEmailEventDto
  ) {}

  toString() {
    return JSON.stringify({
      ...this.sendVerificationEmailPayload
    });
  }
}
