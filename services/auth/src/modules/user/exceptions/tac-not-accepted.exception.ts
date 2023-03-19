import { ForbiddenException } from '@nestjs/common';

export class TacNotAcceptedException extends ForbiddenException {
  constructor() {
    super('tac-not-accepted', 'T&C is not accepted');
  }
}
