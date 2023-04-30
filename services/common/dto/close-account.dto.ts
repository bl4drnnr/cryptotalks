import { ApiProperty } from '@nestjs/swagger';

export class CloseAccountDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  password: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;
}
