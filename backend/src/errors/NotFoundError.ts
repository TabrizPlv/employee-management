export class NotFoundError extends Error {
  status: number;

  constructor() {
    super("Employee Not Found!");
    this.status = 404;
  }
}
