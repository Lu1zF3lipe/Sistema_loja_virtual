import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../models/errors/unauthorized';
import { validationService } from '../services/validation.service';

async function JwtAuthentication(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new UnauthorizedError('the authorization header is not defined!!!');
  }
  const [prefix, token] = authorization.split(' ');

  if (prefix.toUpperCase() !== 'BEARER') {
    throw new UnauthorizedError('authetication type not suported!!!');
  }

  const { id } = validationService.validateJWT<{id: string}>(token);
  request.userid = id;

  return next();
}

export { JwtAuthentication };
