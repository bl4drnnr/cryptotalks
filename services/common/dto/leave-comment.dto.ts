import { ApiProperty } from '@nestjs/swagger';

export class LeaveCommentDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  comment: string;
}
