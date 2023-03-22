import { SignUpDto } from '@dto/sign-up.dto';

export class CreateUserEvent {
  constructor(private readonly createUserPayload: SignUpDto) {}

  toString() {
    return JSON.stringify({
      ...this.createUserPayload
    });
  }
}
