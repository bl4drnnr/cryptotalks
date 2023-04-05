import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  email?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  password?: string;
}
