interface UpdateTokensPayload {
  userId: string;
  email: string;
}

export class UpdateTokensDto {
  constructor(private readonly updateTokensPayload: UpdateTokensPayload) {}

  toString() {
    return JSON.stringify({
      ...this.updateTokensPayload
    });
  }
}
