import { ObjectId } from 'bson';
import { validate } from 'class-validator';
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
}

export { validationService };
