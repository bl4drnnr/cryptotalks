import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostInfoEventDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  rate: '+' | '-';

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true
  })
  postId?: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true
  })
  commentId?: string;
}

export class UpdatePostInfoEvent {
  constructor(private readonly updatePostInfoPayload: UpdatePostInfoEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.updatePostInfoPayload
    });
  }
}
