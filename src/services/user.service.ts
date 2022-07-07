import { BadRequestError } from '../models/errors/badrequest';
import { NotFoundError } from '../models/errors/notfound';
import { CreateUserDTO } from '../models/user/dto/create-user.dto';
import { LoginUserDTO } from '../models/user/dto/credentials-user.dto';
import { UpdateUserDTO } from '../models/user/dto/update-user.dto';
import { userRepository } from '../repositories/user.repository';
import { validationService } from './validation.service';

class UserService {
  public static async findAllUsers() {
    const users = await userRepository.findAllUsers();

    return users;
  }

  public static async findUserById(id: string) {
    if (!validationService.ValidationObjectId(id)) {
      throw new BadRequestError('user id is invalid!!!');
    }
    const user = await userRepository.findUserById(id);
    if (!user.id) {
      throw new NotFoundError('not found user with this id');
    }
    return user;
  }

  public static async createUser(create: CreateUserDTO) {
    await validationService.ValidationObject(create);
    const userExist = await userRepository.findUserByEmail(create.email);
    if (userExist.id) {
      throw new BadRequestError('email already in user by other user!!!');
    }
    const user = await userRepository.createUser(create);
    return user;
  }

  /**
   * update user record in database
   *
   * ```ts
   *  const update = {
   *    name: 'john doe',
   *    email: 'johndoe@email.com'
   *    password: 'johndoepassword'
   *  }
   *
   *  const result = await userService.updateUser(update);
   *  console.log(result);
   *
   * // {
   * //   "id": "000000000000000000000000",
   * //   "name": "john doe",
   * //   "email": "johndoe@gmail.com",
   * //   "password": "john_doe_password",
   * //   "created_at": "0000-00-00T00:00:00.000Z",
   * //   "updated_at": "0000-00-00T00:00:00.000Z"
   * // }
   *```
   *
   * @param id user id
   * @param update params to update user register(name, email, password)
   * @returns updated user record
   */

  public static async updateUser(id: string, update: UpdateUserDTO) {
    if (!validationService.ValidationObjectId(id)) {
      throw new BadRequestError('user id is invalid!!!');
    }
    await validationService.ValidationObject(update);
    if (update.email) {
      const userExist = await userRepository.findUserByEmail(update.email);
      if (userExist.id && userExist.id !== id) {
        throw new BadRequestError('email already in user by other user!!!');
      }
    }

    const user = await userRepository.updateUser(id, update);
    if (!user.id) {
      throw new NotFoundError('not found user with this id');
    }
    return user;
  }

  public static async deleteUser(id: string) {
    if (!validationService.ValidationObjectId(id)) {
      throw new BadRequestError('user id is invalid!!!');
    }
    const deletedUser = await userRepository.deleteUser(id);
    if (!deletedUser.id) {
      throw new NotFoundError('not found user with this id');
    }
    return deletedUser;
  }

  public static async findUserByEmailAndPassword(credentials: LoginUserDTO) {
    await validationService.ValidationObject(credentials);
    const user = await userRepository.findUserByEmail(credentials.email);
    if (!user.id || !validationService.ValidateHash(credentials.password, user.password)) {
      throw new BadRequestError('email or password is incorrect');
    }

    return user;
  }
}

export { UserService };
