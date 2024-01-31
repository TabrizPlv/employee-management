import { NotFoundError } from "./errors/NotFoundError";
import { InvalidInputError } from "./errors/InvalidInputError";

export default class ErrorUtil {
  public static checkError(error: unknown) {
    if (error instanceof NotFoundError) {
      return error;
    } else if (error instanceof InvalidInputError) {
      return error;
    }
    return error as Error;
  }
}
