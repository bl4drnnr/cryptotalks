import { Controller } from '@nestjs/common';
import { UsersService } from '@modules/users.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user_created')
  handleSignUp(data: any) {
    return this.usersService.signUp(data);
  }

  @MessagePattern('get_user_by_id')
  getUserById(data: any) {
    return this.usersService.getUserById(data);
  }

  @EventPattern('confirm_user_account')
  confirmUserAccount(data: any) {
    return this.usersService.accountConfirmation(data);
  }
}
