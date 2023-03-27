import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CorruptedTokenException } from '@exceptions/corrupted-token.exception';
import { InvalidTokenException } from '@exceptions/invalid-token.exception';
import { ApiConfigService } from '@shared/config.service';
import { ExpiredTokenException } from '@exceptions/expired-token.exception';
import { SessionHasExpiredException } from '@exceptions/session-expired.exception';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly configService: ApiConfigService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['x-access-token'];

    if (!authHeader) throw new InvalidTokenException();

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) throw new CorruptedTokenException();

    try {
      const tokenData = this.jwtService.verify(token, {
        secret: this.configService.jwtSecret.secret
      });
      req.user = tokenData.userId;
      return true;
    } catch (error: any) {
      if (error instanceof jwt.TokenExpiredError)
        throw new ExpiredTokenException();
      else if (error instanceof jwt.JsonWebTokenError)
        throw new InvalidTokenException();
      else throw new SessionHasExpiredException();
    }
  }
}
