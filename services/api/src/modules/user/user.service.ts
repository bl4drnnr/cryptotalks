import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from '@dto/sign-up.dto';
import { UserSignUpEvent } from '@events/user-sign-up.event';
import { SignInDto } from '@dto/sign-in.dto';
import { UserSignInEvent } from '@events/user-sign-in.event';
import { ConfirmAccountEvent } from '@events/confirm-account.event';

class VerifyTokenDto {
  constructor(private readonly token: string) {}

  toString() {
    return JSON.stringify({
      token: this.token
    });
  }
}


@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka
  ) {}

  signUp(payload: SignUpDto) {
    return this.userClient.send(
      'user_created',
      new UserSignUpEvent({ ...payload })
    );
  }

  signIn(payload: SignInDto) {
    return this.userClient.send(
      'user_sign_in',
      new UserSignInEvent({ ...payload })
    );
  }

  confirmAccount({ confirmationHash }: { confirmationHash: string }) {
    return this.userClient.send(
      'confirm_user_account',
      new ConfirmAccountEvent({ confirmationHash })
    );
  }

  logout(token: string) {
    return this.userClient.send(
      'verify_token',
      new VerifyTokenDto(token)
    );
  }

  onModuleInit(): any {
    this.userClient.subscribeToResponseOf('user_sign_in');
    this.userClient.subscribeToResponseOf('user_created');
    this.userClient.subscribeToResponseOf('confirm_user_account');
    this.userClient.subscribeToResponseOf('verify_token');
  }
}
