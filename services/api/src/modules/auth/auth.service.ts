import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RefreshTokensEvent } from '@events/refresh-tokens.event';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka
  ) {}

  refreshTokens({ refreshToken }: { refreshToken: string }) {
    return this.authService.send(
      'refresh_tokens',
      new RefreshTokensEvent({ refreshToken })
    );
  }

  onModuleInit(): any {
    this.authService.subscribeToResponseOf('refresh_tokens');
  }
}
