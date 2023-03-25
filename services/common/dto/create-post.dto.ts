import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  title: string;

  @ApiProperty({
    type: [String],
    nullable: false
  })
  content: Array<string>;
}
