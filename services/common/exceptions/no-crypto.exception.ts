import { BadRequestException } from '@nestjs/common';

export class NoCryptoException extends BadRequestException {
  constructor(message = 'no-crypto', description = 'Cryptocurrency not found') {
    super(message, description);
  }
}
