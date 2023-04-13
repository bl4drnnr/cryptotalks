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
    type: String,
    nullable: true
  })
  preview?: string;

  @ApiProperty({
    type: [String],
    nullable: true
  })
  searchTags?: Array<string>;

  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  postId: string;
}
