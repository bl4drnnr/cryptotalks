// import {SignUpEventDto} from "../event-dto/sign-up-event.dto";

import { SignUpEventDto } from '../event-dto/sign-up-event.dto';

export class UserSignUpEvent {
  constructor(private readonly createUserPayload: SignUpEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.createUserPayload
    });
  }
}
