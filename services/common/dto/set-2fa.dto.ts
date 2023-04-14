import { ApiProperty } from '@nestjs/swagger';

export class Set2faDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  twoFaToken: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  twoFaCode: string;
}
