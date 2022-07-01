import { User } from '../models/user.models';

class UserRepository {
  async findAllUsers(): Promise<User[]> {

  }
}

export const userRepository = new UserRepository();
