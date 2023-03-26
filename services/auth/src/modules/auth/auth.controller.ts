import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('update_tokens')
  updateTokens(data: any) {
    return this.authService.updateTokens(data);
  }

  @MessagePattern('logout')
  logout(data: any) {
    return this.authService.deleteRefreshToken(data);
  }

  @MessagePattern('verify_token')
  verifyToken(data: any) {
    return this.authService.verifyToken(data);
  }
}
