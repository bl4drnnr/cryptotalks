import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignUpDto } from '@dto/sign-up.dto';
import {CreateUserEvent} from "@events/create-user.event";

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka
  ) {}

  signUp(payload: SignUpDto) {
    return this.userClient.emit('user_created', new CreateUserEvent(
      payload.email,
      payload.password,
      payload.username,
      payload.tac,
      payload.firstName,
      payload.lastName,
      payload.twitter,
      payload.linkedIn,
      payload.personalWebsite,
      payload.title,
      payload.bio,
      payload.publicEmail
    ));
  }
}
