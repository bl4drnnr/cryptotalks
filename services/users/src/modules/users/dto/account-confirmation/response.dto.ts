export class AccountConfirmationResponse {
  constructor(message = 'success') {
    this.message = message;
  }

  private readonly message: string;
}
