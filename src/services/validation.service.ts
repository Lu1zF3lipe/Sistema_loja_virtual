import { compareSync } from 'bcryptjs';
import { ObjectId } from 'bson';
import { validate } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { BadRequestError } from '../models/errors/badrequest';

class validationService {
  public static async ValidationObject(obj: Object) {
    const result = await validate(obj);
    const error = result.shift();
    if (error) {
      const errorMessage = Object.values(error.constraints).shift();
      throw new BadRequestError(errorMessage);
    }
  }

  public static ValidationObjectId(objectId: string) {
    return ObjectId.isValid(objectId);
  }

  public static ValidateHash(text: string, hash: string) {
    return compareSync(text, hash);
  }

  public static validateJWT<T>(token: string): T {
    try {
      return verify(token, process.env.JWT_SECRET) as T;
    } catch (error) {
      throw new BadRequestError('invalid token');
    }
  }
}

export { validationService };
