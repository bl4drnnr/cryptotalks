import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from '@dto/sign-up.dto';
import { UserSignUpEvent } from '@events/user-sign-up.event';
import { SignInDto } from '@dto/sign-in.dto';
import { UserSignInEvent } from '@events/user-sign-in.event';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka
  ) {}

  signUp(payload: SignUpDto) {
    return this.userClient.emit(
      'user_created',
      new UserSignUpEvent({ ...payload })
    );
  }

  signIn(payload: SignInDto) {
    return this.userClient.emit(
      'user_sign_in',
      new UserSignInEvent({ ...payload })
    );
  }
}
