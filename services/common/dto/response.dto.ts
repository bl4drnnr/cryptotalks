import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  constructor(message = 'success') {
    this.message = message;
  }

  @ApiProperty({
    type: String,
    nullable: false
  })
  message: string;

  toString() {
    return JSON.stringify({
      message: this.message
    });
  }
}
