import { UpdateUserEventDto } from '../event-dto/update-user.event.dto';

export class UpdateUserEvent {
  constructor(private readonly updateUserPayload: UpdateUserEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.updateUserPayload
    });
  }
}
