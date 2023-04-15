import { ApiProperty } from '@nestjs/swagger';

export class RemovePhoneDto {
  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;
}
