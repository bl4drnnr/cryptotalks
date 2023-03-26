import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit
} from '@nestjs/common';
import { CorruptedTokenException } from '@exceptions/corrupted-token.exception';
import { InvalidTokenException } from '@exceptions/invalid-token.exception';
import { ClientKafka } from '@nestjs/microservices';
import { UserService } from '@modules/user.service';

class VerifyTokenDto {
  constructor(private readonly token: string) {}

  toString() {
    return JSON.stringify({
      token: this.token
    });
  }
}

interface ITokenPayload {
  id: string;
  type: string;
  userId: string;
}

@Injectable()
export class JwtGuard implements CanActivate, OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['application-authorization'];

    if (!authHeader) throw new InvalidTokenException();

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) throw new CorruptedTokenException();

    const response = await this.authClient.send(
      'verify_token',
      new VerifyTokenDto(token)
    );
    response.subscribe((payload) => {
      //
    });

    // req.user = payload.userId;

    return true;
  }

  onModuleInit(): any {
    this.authClient.subscribeToResponseOf('verify_token');
  }
}
