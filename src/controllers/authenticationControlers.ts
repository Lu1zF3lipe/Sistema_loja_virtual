import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { LoginUserDTO } from '../models/user/dto/credentials-user.dto';
import { SecurityService } from '../services/security.service';
import { UserService } from '../services/user.service';

class authenticationControlers {
  public static async createJWT(request: Request, response: Response) {
    const credentialsUserDTO = plainToInstance(LoginUserDTO, request.body);
    const createJwtDTO = await UserService.findUserByEmailAndPassword(credentialsUserDTO);
    const jwt = await SecurityService.createJWT(createJwtDTO);
    response.status(200).json({ token: jwt });
  }
}

export { authenticationControlers };
