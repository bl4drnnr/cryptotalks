import { BadRequestException } from '@nestjs/common';

export class PhoneCodeErrorException extends BadRequestException {
  constructor(
    message = 'phone-code-error',
    description = 'Wrong or expired code'
  ) {
    super(message, description);
  }
}
