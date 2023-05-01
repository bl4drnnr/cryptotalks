import { ApiProperty } from '@nestjs/swagger';

export class DeletePostEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  id: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  twoFaCode?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;
}

export class DeletePostEvent {
  constructor(private readonly deletePostPayload: DeletePostEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.deletePostPayload
    });
  }
}
