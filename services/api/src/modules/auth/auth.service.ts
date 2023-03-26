import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RefreshTokensEvent } from '@events/refresh-tokens.event';
import { from, tap } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka
  ) {}

  async refreshTokens({ refreshToken }: { refreshToken: string }) {
    return await from(
      new Promise<any>((resolve) => {
        this.authService
          .send('refresh_tokens', new RefreshTokensEvent({ refreshToken }))
          .pipe(
            tap((t) => {
              resolve(t);
            })
          )
          .subscribe();
      })
    ).toPromise();
  }

  onModuleInit(): any {
    this.authService.subscribeToResponseOf('refresh_tokens');
  }
}
