import { ApiProperty } from '@nestjs/swagger';

export class UploadPhotoDto {
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'Base64 string describing photo'
  })
  photo: string;
}
