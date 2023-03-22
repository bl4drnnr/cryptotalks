import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from '@dto/sign-up.dto';
import { CreateUserEvent } from '@events/create-user.event';
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
      new CreateUserEvent({ ...payload })
    );
  }

  signIn(payload: SignInDto) {
    console.log('payload1', payload)
    return this.userClient.emit(
      'user_signed_in',
      new UserSignInEvent({ ...payload })
    );
  }
}
