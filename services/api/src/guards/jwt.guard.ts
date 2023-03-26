import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CorruptedTokenException } from '@exceptions/corrupted-token.exception';
import { InvalidTokenException } from '@exceptions/invalid-token.exception';
import { ClientKafka } from '@nestjs/microservices';

interface ITokenPayload {
  id: string;
  type: string;
  userId: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  // constructor(@Inject() private clientKafka : ClientKafka) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['application-authorization'];

    if (!authHeader) throw new InvalidTokenException();

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) throw new CorruptedTokenException();

    // const payload: ITokenPayload = this.authService.verifyToken(token);

    // req.user = payload.userId;
    return true;
  }
}
