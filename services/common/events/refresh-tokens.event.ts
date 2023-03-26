export class RefreshTokensEvent {
  constructor(
    private readonly refreshTokensPayload: { refreshToken: string }
  ) {}

  toString() {
    return JSON.stringify({
      ...this.refreshTokensPayload
    });
  }
}
