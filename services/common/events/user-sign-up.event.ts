import { SignUpDto } from '../dto/sign-up.dto';

export class UserSignUpEvent {
  constructor(private readonly createUserPayload: SignUpDto) {}

  toString() {
    return JSON.stringify({
      ...this.createUserPayload
    });
  }
}
