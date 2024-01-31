export class UnknownError extends Error {
  status: number;

  constructor() {
    super("Unknown Error!");
    this.status = 520;
  }
}
