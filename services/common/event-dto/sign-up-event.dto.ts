import { ApiProperty } from '@nestjs/swagger';

export class SignUpEventDto {
  @ApiProperty({
    type: 'string',
    nullable: true
  })
  confirmationHash?: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    nullable: true
  })
  email?: string;
}
