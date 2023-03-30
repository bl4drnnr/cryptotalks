import { ApiProperty } from '@nestjs/swagger';

export class UserLogoutEventDto {
  @ApiProperty({
    type: 'uuidv4',
    nullable: true
  })
  userId: string;
}
