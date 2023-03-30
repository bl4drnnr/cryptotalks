import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostEventDto {
  @ApiProperty({
    type: String,
    nullable: true
  })
  title?: string;

  @ApiProperty({
    type: [String],
    nullable: true
  })
  content?: Array<string>;

  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  postId: string;
}
