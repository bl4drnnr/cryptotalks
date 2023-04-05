import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth.service';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtGuard } from '@guards/jwt.guard';
import { CookieRefreshToken } from '@decorators/cookie-refresh-token.decorator';
import { AccessTokenDto } from '@dto/access-token.dto';
import { RefreshTokenDto } from '@dto/refresh-token.dto';
import { TokenPayloadDto } from '@dto/token-payload.dto';
import { RefreshTokenEventDto } from '@event-dto/refresh-token.event.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiExtraModels(AccessTokenDto)
  @ApiExtraModels(RefreshTokenDto)
  @ApiExtraModels(TokenPayloadDto)
  @ApiExtraModels(RefreshTokenEventDto)
  @ApiOperation({ summary: 'Refreshes tokens' })
  @ApiResponse({
    status: 201,
    description: 'Refreshes both tokens and returns to user'
  })
  @Get('refresh')
  @UseGuards(JwtGuard)
  async refreshTokens(
    @CookieRefreshToken() refreshToken: string,
    @Res({ passthrough: true }) res
  ) {
    const { _rt, _at } = await this.authService.refreshToken({ refreshToken });

    res.cookie('_rt', _rt);

    return { _at };
  }
}
