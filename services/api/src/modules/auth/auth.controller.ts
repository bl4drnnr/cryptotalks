import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@modules/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@guards/jwt.guard';
import { Cookie } from '@decorators/cookie.decorator';
import { FastifyReply } from 'fastify';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Refreshes tokens' })
  @ApiResponse({
    status: 201,
    description: 'Refreshes both tokens and returns to user'
  })
  @Get('refresh')
  @UseGuards(JwtGuard)
  async refreshTokens(
    @Res({ passthrough: true }) res: FastifyReply,
    @Cookie('_rt') refreshToken: string
  ) {
    const refreshedTokens = this.authService.refreshTokens({ refreshToken });

    // res.cookie('_rt', refreshedTokens._rt);

    // return { _at: refreshedTokens._at };
  }
}
