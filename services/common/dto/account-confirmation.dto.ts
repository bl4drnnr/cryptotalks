import { ApiProperty } from '@nestjs/swagger';

export class AccountConfirmationDto {
  @ApiProperty({
    type: 'string',
    nullable: false
  })
  confirmationHash: string;
}
