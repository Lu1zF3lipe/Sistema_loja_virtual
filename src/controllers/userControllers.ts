import { Request, Response } from 'express';
import { consumers } from 'stream';
import { userRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

class userControllers {
  public static async findAllUser(request: Request, response: Response) {
    const users = await UserService.findAllUsers();
    response.status(200).json(users);
  }

  public static async createUser(request: Request, response: Response) {
    const user = await UserService.createUser(request.body); 
    response.status(201).send(user.id);
  }

  public static async deleteUser(request: Request<{id: string}>, response: Response) {
    const id = await UserService.deleteUser(request.params.id);
    response.sendStatus(200);
  }

  public static async findUserById(request: Request<{id: string}>, response: Response) {
    const user = await UserService.findUserById(request.params.id);
    response.status(200).json(user);
  }

  public static async userUpdate(request: Request<{id: string}>, response: Response) {
    const id = request.params.id;
    const modfiedUser = request.body;

    modfiedUser.id = id;

    await UserService.userUpdate(modfiedUser);
    response.sendStatus(200);
  }
}

export { userControllers };
