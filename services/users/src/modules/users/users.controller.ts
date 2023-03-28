import { Controller } from '@nestjs/common';
import { UsersService } from '@modules/users.service';
import {EventPattern, MessagePattern} from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('user_created')
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

  @MessagePattern('confirm_user_account')
  confirmUserAccount(data: any) {
    return this.usersService.accountConfirmation(data);
  }
}
