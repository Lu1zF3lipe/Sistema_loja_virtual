import { PrismaClient } from '@prisma/client';
import { prisma } from '../db';
import { CreateUserDTO } from '../models/user/dto/create-user.dto';
import { UpdateUserDTO } from '../models/user/dto/update-user.dto';
import { User } from '../models/user/user.models';
import { SecurityService } from '../services/security.service';

class UserRepository {
  // eslint-disable-next-line no-useless-constructor, no-shadow, no-unused-vars, no-empty-function
  constructor(private prisma: PrismaClient) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.prisma.users.findMany();
    return users.map((user) => new User(user));
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    return new User(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    return new User(user);
  }

  async createUser({ name, email, password }: CreateUserDTO):Promise<User> {
    const user = await this.prisma.users.create({
      data: {
        name,
        email,
        password: await SecurityService.hash(password),
      },
    });

    return new User(user);
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const deletedUser = await this.prisma.users.delete({
        where: {
          id,
        },
      });

      return new User(deletedUser);
    } catch (error) {
      return new User({});
    }
  }

  async updateUser(id: string, { name, email, password }: UpdateUserDTO): Promise<User> {
    try {
      const updatedUser = await this.prisma.users.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password: await SecurityService.hash(password),
        },
      });

      return new User(updatedUser);
    } catch (error) {
      return new User({});
    }
  }
}

export const userRepository = new UserRepository(prisma);
