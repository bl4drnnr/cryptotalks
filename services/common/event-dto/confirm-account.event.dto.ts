import { ApiProperty } from '@nestjs/swagger';

export class ConfirmAccountEventDto {
  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  hashId: string;

  @ApiProperty({
    type: 'uuidv4',
    nullable: false
  })
  userId: string;
}
