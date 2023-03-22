import { SignInDto } from '@dto/sign-in.dto';

export class UserSignInEvent {
  constructor(private readonly signInUserPayload: SignInDto) {}

  toString() {
    return JSON.stringify({
      ...this.signInUserPayload
    });
  }
}
