import { ForbiddenException } from '@nestjs/common';

export class Wrong2faException extends ForbiddenException {
  constructor(message = 'wrong-2fa', description = 'Wrong 2FA code') {
    super(message, description);
  }
}
