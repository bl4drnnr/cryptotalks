import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignInDto } from '@dto/sign-in.dto';
import { SignUpDto } from '@dto/sign-up.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka
  ) {}

  signUp(payload: SignUpDto) {
    return this.userClient.emit('user_created', {});
  }
}
