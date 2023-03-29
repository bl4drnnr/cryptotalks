import { ApiProperty } from '@nestjs/swagger';

export class SignUpEventDto {
  @ApiProperty({
    type: String,
    nullable: true
  })
  confirmationHash?: string;

  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  email?: string;
}
