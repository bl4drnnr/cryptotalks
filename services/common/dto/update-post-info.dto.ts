import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostInfoDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  rate: '+' | '-';
}
