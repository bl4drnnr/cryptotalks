import { BadRequestException } from '@nestjs/common';

export class Wrong2faException extends BadRequestException {
  constructor(message = 'wrong-2fa', description = 'Wrong 2FA code') {
    super(message, description);
  }
}
