import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../models/user/dto/create-user.dto';
import { UpdateUserDTO } from '../models/user/dto/update-user.dto';
import { UserService } from '../services/user.service';

class userControllers {
  public static async findAllUser(request: Request, response: Response) {
    const users = await UserService.findAllUsers();
    response.status(200).json(instanceToPlain(users));
  }

  public static async createUser(request: Request, response: Response) {
    const createUserDTO = plainToInstance(CreateUserDTO, request.body);
    const user = await UserService.createUser(createUserDTO);
    response.status(201).send(instanceToPlain(user));
  }

  public static async deleteUser(request: Request, response: Response) {
    const deletedUser = await UserService.deleteUser(request.userid);
    response.status(200).json(instanceToPlain(deletedUser));
  }

  public static async findUserById(request: Request, response: Response) {
    const user = await UserService.findUserById(request.params.id);
    response.status(200).json(instanceToPlain(user));
  }

  public static async updateUser(request: Request, response: Response) {
    const updateUserDTO = plainToInstance(UpdateUserDTO, request.body);

    const updatedUser = await UserService.updateUser(request.userid, updateUserDTO);
    response.status(200).json(instanceToPlain(updatedUser));
  }

  public static async currentUser(request: Request, response: Response) {
    const user = await UserService.findUserById(request.userid);
    response.status(200).json(instanceToPlain(user));
  }
}

export { userControllers };
