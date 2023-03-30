import { UserLogoutEventDto } from '../event-dto/user-logout.event.dto';

export class UserLogoutEvent {
  constructor(private readonly userLogoutPayload: UserLogoutEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.userLogoutPayload
    });
  }
}
