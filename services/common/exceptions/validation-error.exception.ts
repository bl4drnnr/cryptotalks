import { BadRequestException } from '@nestjs/common';

export class ValidationErrorException extends BadRequestException {
  constructor(message = 'validation-error', description = 'Validation error') {
    super(message, description);
  }
}
