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
}
