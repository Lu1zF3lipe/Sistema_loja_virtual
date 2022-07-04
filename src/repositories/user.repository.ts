import { ObjectId } from 'bson';
import { prisma } from '../db';
import { User } from '../models/user.models';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return users.map(user => new User(user));
  }

  async findUserById(id: string): Promise<User> {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    });

    return new User(user);
  }

  async createUser({name, email, password}):Promise<User>{
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password
      }
    });

    return new User(user);
  } 

  async deleteUser(id: string): Promise<void> {
    const deleteUser = await prisma.users.delete({
      where: {
        id
      } 
    });
  }

  async userUpdate({id, name, email, password}): Promise<void> {
    const user = await prisma.users.update({
      where: {
        id: id
      },
      data: {
        name,
        email,
        password
      }
    })
  }
}

export const userRepository = new UserRepository();
