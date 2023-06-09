import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('log_auth_action')
  handleLogSigningIn(data: any) {
    return this.authService.logAuthAction(data);
  }

  @EventPattern('user_logout')
  handleLogout(data: any) {
    return this.authService.deleteRefreshToken(data);
  }
}
