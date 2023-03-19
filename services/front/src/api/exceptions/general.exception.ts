export class GeneralException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, GeneralException.prototype);
  }
}
