import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignInDto } from '@dto/sign-in.dto';
import { SignUpDto } from '@dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  signIn(payload: SignInDto) {
    return this.authClient.emit('user_signed_in', {});
  }

  signUp(payload: SignUpDto) {
    return this.userClient.emit('user_created', {});
  }
}
