import { UpdateUserSecurityEventDto } from '../event-dto/update-user-security.event.dto';

export class UpdateUserSecurityEvent {
  constructor(
    private readonly updateUserSecurityPayload: UpdateUserSecurityEventDto
  ) {}

  toString() {
    return JSON.stringify({
      ...this.updateUserSecurityPayload
    });
  }
}
