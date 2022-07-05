import { WebError } from './weberror';

class NotFoundError extends WebError {
  constructor(message: string) {
    super(message, 404);
  }
}

export { NotFoundError };
