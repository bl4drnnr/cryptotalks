import { ApiProperty } from '@nestjs/swagger';

export class CloseAccEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;
}