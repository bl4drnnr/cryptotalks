import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { CorruptedTokenException } from '@auth/exceptions/corrupted-token.exception';
import { InvalidTokenException } from '@auth/exceptions/invalid-token.exception';

interface ITokenPayload {
  id: string;
  type: string;
  userId: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['application-authorization'];

    if (!authHeader) throw new InvalidTokenException();

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) throw new CorruptedTokenException();

    const payload: ITokenPayload = this.authService.verifyToken(token);

    req.user = payload.userId;
    return true;
  }
}
