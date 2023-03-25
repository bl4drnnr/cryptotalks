import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    name: 'Title',
    type: 'string',
    nullable: false
  })
  title: string;

  @ApiProperty({
    name: 'Content',
    type: 'Array<string>',
    nullable: false
  })
  content: Array<string>;
}
