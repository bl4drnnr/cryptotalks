import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoinEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  coinId: string;
}
