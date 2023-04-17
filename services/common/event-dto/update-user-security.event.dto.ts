import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSecurityEventDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    nullable: false
  })
  userId: string;

  @ApiProperty({
    type: Boolean,
    nullable: true
  })
  publicEmail?: boolean;

  @ApiProperty({
    type: String,
    nullable: true
  })
  twoFaToken?: string;

  @ApiProperty({
    type: String,
    nullable: false
  })
  twoFaCode?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  phone?: string;

  @ApiProperty({
    type: String,
    nullable: true
  })
  code?: string;

  @ApiProperty({
    type: Date,
    nullable: true
  })
  passwordChanged?: Date;
}
