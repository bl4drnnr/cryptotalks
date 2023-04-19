import { ApiProperty } from '@nestjs/swagger';

export class DeletePostEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  id: string;
}

export class DeletePostEvent {
  constructor(private readonly deletePostPayload: DeletePostEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.deletePostPayload
    });
  }
}
