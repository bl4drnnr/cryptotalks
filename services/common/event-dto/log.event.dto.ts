import { ApiProperty } from '@nestjs/swagger';

export class LogEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  message: string;

  @ApiProperty({
    type: 'SIGN_IN | SIGN_UP | CONFIRMATION | POST',
    nullable: false
  })
  event: 'SIGN_IN' | 'SIGN_UP' | 'CONFIRMATION' | 'POST';

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
