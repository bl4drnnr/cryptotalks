export class ApiException extends Error {
  statusCode: number;

  description: string;

  error: string;

  constructor(statusCode: number, message: string, description: string) {
    super(message);
    this.error = message;
    this.statusCode = statusCode;
    this.description = description;
  }
}
