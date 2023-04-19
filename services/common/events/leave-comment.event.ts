import { ApiProperty } from '@nestjs/swagger';

export class LeaveCommentEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  comment: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  postId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;
}

export class LeaveCommentEvent {
  constructor(private readonly leaveCommentPayload: LeaveCommentEventDto) {}

  toString() {
    return JSON.stringify({});
  }
}
