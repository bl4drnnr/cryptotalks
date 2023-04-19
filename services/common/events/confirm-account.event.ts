import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAccountEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  hashId: string;

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
}

export class ConfirmAccountEvent {
  constructor(private readonly confirmAccountDto: ConfirmAccountEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.confirmAccountDto
    });
  }
}
