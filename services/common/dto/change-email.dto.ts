import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailDto {
  @ApiProperty({
    type: String,
    nullable: false
  })
  email: string;
}
