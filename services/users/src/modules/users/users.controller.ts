import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { UsersService } from '@modules/users.service';
import {
  ClientKafka,
  EventPattern,
  MessagePattern
} from '@nestjs/microservices';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  @EventPattern('user_created')
  handleSignUp(data: any) {
    return this.usersService.signUp(data);
  }

  @MessagePattern('user_sign_in')
  handleSignIn(data: any) {
    return this.usersService.signIn(data);
  }

  @MessagePattern('get_user_by_id')
  getUserById(data: any) {
    return this.usersService.getUserById(data);
  }

  onModuleInit(): any {
    this.authClient.subscribeToResponseOf('update_tokens');
  }
}
