export class SignUpResponse {
  constructor(message = 'success') {
    this.message = message;
  }
  private readonly message: string;
}
