import { NextFunction, Request, Response } from 'express';
import { WebError } from '../models/errors/weberror';

// eslint-disable-next-line no-unused-vars
function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  if (error instanceof WebError) {
    response.status(error.code).json({ message: error.message });
  } else {
    response.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
  }
}

export { errorHandler };
