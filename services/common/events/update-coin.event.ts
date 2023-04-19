import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoinEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  coinId: string;
}

export class UpdateCoinEvent {
  constructor(private readonly updateCoinEventPayload: UpdateCoinEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.updateCoinEventPayload
    });
  }
}
