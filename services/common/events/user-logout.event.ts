import { ApiProperty } from '@nestjs/swagger';

export class UserLogoutEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true
  })
  userId: string;
}

export class UserLogoutEvent {
  constructor(private readonly userLogoutPayload: UserLogoutEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.userLogoutPayload
    });
  }
}
