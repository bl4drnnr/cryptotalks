import { ApiProperty } from '@nestjs/swagger';

export class DeletePostEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  id: string;
}
