import { ApiProperty } from '@nestjs/swagger';

export class UserLogoutEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: true
  })
  userId: string;
}
