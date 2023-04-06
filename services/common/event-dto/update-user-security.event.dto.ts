import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSecurityEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;
}
