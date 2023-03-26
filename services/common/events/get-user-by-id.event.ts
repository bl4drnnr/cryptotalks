export class GetUserByIdEvent {
  constructor(private readonly getUserByIdPayload: { id: string }) {}

  toString() {
    return JSON.stringify({
      ...this.getUserByIdPayload
    });
  }
}
