import { Logger } from "./Logger";

class ErrorHandler {
  static handle(error: Error): void {
    Logger.error(error.message, error);
  }
}

export { ErrorHandler };
