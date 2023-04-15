import { ApiProperty } from '@nestjs/swagger';

export class SetPhoneDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  phone: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;
}
