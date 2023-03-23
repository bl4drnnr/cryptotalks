import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { UsersService } from '@modules/users.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

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

  @EventPattern('user_signed_in')
  handleSignIn(data: any) {
    return this.usersService.signIn(data);
  }

  onModuleInit(): any {
    this.authClient.subscribeToResponseOf('update_tokens');
  }
}
