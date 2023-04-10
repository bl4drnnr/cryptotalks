import { ApiProperty } from '@nestjs/swagger';

enum LogEventType {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  CONFIRMATION = 'CONFIRMATION',
  POST = 'POST',
  CLOSE_ACC = 'CLOSE_ACC',
  USER = 'USER',
  CRYPTO = 'CRYPTO'
}

export class LogEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  message: string;

  @ApiProperty({
    enum: LogEventType,
    isArray: true,
    nullable: false
  })
  event:
    | 'SIGN_IN'
    | 'SIGN_UP'
    | 'CONFIRMATION'
    | 'POST'
    | 'CLOSE_ACC'
    | 'USER'
    | 'CRYPTO';

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
