import { ApiProperty } from '@nestjs/swagger';

export class Remove2faDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  twoFaCode: string;
}
