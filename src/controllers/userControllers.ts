import { Request, Response } from 'express';
import { userRepository } from '../repositories/user.repository';

class userControllers {
  public static async findAllUser(request: Request, response: Response) {
    const user = userRepository.findAllUsers;
    response.status(200).json(user);
  }
}

export { userControllers };
