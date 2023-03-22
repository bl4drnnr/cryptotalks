import { Controller } from '@nestjs/common';
import { UsersService } from '@modules/users.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user_created')
  handleSignUp(data: any) {
    return this.usersService.signUp(data);
  }

  @EventPattern('user_signed_in')
  handleSignIn(data: any) {
    return this.usersService.signIn(data);
  }
}
