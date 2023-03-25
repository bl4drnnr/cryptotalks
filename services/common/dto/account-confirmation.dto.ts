import { ApiProperty } from '@nestjs/swagger';

export class AccountConfirmationDto {
  @ApiProperty({
    name: 'Confirmation hash',
    type: 'string',
    nullable: false
  })
  confirmHash: string;
}
