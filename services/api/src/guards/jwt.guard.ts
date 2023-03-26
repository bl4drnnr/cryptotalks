import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable, OnModuleInit
} from '@nestjs/common';
import { CorruptedTokenException } from '@exceptions/corrupted-token.exception';
import { InvalidTokenException } from '@exceptions/invalid-token.exception';
import { ClientKafka } from '@nestjs/microservices';
import {UserService} from "@modules/user.service";

interface ITokenPayload {
  id: string;
  type: string;
  userId: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    // @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['application-authorization'];

    if (!authHeader) throw new InvalidTokenException();

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) throw new CorruptedTokenException();

    // const payload: ITokenPayload = this.authService.verifyToken(token);
    // const response = await this.authClient
    //   .send(
    //     'verify_token',
    //     new VerifyTokenDto(token)
    //   );
    const response = await this.userService.logout(token);
    console.log('response', response.subscribe((t) => {
      console.log('t', t);
    }));

    // req.user = payload.userId;

    return true;
  }
}
