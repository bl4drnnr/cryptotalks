import { ApiProperty } from '@nestjs/swagger';

export class CloseAccEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;
}

export class CloseAccEvent {
  constructor(private readonly closeAccPayload: CloseAccEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.closeAccPayload
    });
  }
}
