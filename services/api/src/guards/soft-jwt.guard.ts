import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiConfigService } from '@shared/config.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SoftJwtGuard implements CanActivate {
  constructor(
    private readonly configService: ApiConfigService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['x-access-token'];

    if (authHeader) {
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer === 'Bearer' && token) {
        try {
          const tokenData = this.jwtService.verify(token, {
            secret: this.configService.jwtAuthConfig.secret
          });
          req.user = tokenData.userId;
          return true;
        } catch (error: any) {
          return true;
        }
      } else {
        return true;
      }
    }
    {
      return true;
    }
  }
}
