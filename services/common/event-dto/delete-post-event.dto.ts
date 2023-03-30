import { ApiProperty } from '@nestjs/swagger';

export class DeletePostEventDto {
  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  id: string;
}
