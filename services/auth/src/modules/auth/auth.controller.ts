import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('refresh_tokens')
  handleRefreshTokens(data: any) {
    return this.authService.refreshToken(data);
  }

  @MessagePattern('update_tokens')
  handleUpdateTokens(data: any) {
    return this.authService.updateTokens(data);
  }

  @EventPattern('user_logout')
  handleLogout(data: any) {
    return this.authService.deleteRefreshToken(data);
  }
}
