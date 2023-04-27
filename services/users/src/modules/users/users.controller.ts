import { Controller } from '@nestjs/common';
import { UsersService } from '@modules/users.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('log_user_action')
  handleLogUserAction(data: any) {
    return this.usersService.logUserAction(data);
  }

  @EventPattern('user_created')
  handleSignUp(data: any) {
    return this.usersService.signUp(data);
  }

  @EventPattern('confirm_user_account')
  handleConfirmUserAccount(data: any) {
    return this.usersService.accountConfirmation(data);
  }

  @EventPattern('change_email')
  handleConfirmEmailChange(data: any) {
    return this.usersService.changeEmail(data);
  }

  @EventPattern('update_user_account')
  handleUpdateUserAccount(data: any) {
    return this.usersService.updateUserAccount(data);
  }

  @EventPattern('update_user_security_settings')
  handleUpdateUserSecuritySettings(data: any) {
    return this.usersService.updateUserSecuritySettings(data);
  }

  @EventPattern('close_user_account')
  handleCloseUserAccount(data: any) {
    return this.usersService.closeUserAccount(data);
  }

  @EventPattern('send_verification_mobile_code')
  handleSendVerificationMobileCode(data: any) {
    return this.usersService.sendVerificationMobileCode(data);
  }

  @EventPattern('send_verification_email')
  handleSendVerificationEmail(data: any) {
    return this.usersService.sendVerificationEmail(data);
  }
}
