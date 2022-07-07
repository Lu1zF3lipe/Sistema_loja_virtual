import { WebError } from './weberror';

class UnauthorizedError extends WebError {
  constructor(message: string) {
    super(message, 401);
  }
}

export { UnauthorizedError };
