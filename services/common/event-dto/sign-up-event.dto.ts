import { ApiProperty } from '@nestjs/swagger';

export class SignUpEventDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  confirmationHash: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    nullable: false
  })
  email: string;
}
