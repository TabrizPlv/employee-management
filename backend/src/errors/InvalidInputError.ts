export class InvalidInputError extends Error {
  status: number;

  constructor() {
    super("Invalid Input!");
    this.status = 400;
  }
}
