export class UserLogoutEvent {
  constructor(private readonly userLogoutPayload: { userId: string }) {}

  toString() {
    return JSON.stringify({
      ...this.userLogoutPayload
    });
  }
}
