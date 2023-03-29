import { ApiProperty } from '@nestjs/swagger';

export class LogEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  message: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  event: string;

  @ApiProperty({
    type: 'SUCCESS | ERROR',
    nullable: false
  })
  status: 'SUCCESS' | 'ERROR';

  @ApiProperty({
    type: Date,
    nullable: false
  })
  timestamp: Date;
}
