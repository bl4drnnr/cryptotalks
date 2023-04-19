import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailEventDto {
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
  confirmationType?: 'EMAIL_CHANGE';

  @ApiProperty({
    type: String,
    nullable: true
  })
  email?: string;
}

export class ChangeEmailEvent {
  constructor(private readonly changeEmailPayload: ChangeEmailEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.changeEmailPayload
    });
  }
}
