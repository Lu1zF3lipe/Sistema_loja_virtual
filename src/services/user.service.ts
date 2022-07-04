import { validate } from "email-validator";
import { BadRequestError } from "../models/errors/badrequest";
import { userRepository } from "../repositories/user.repository";

class UserService{
    public static async findAllUsers() { 
        const users = await userRepository.findAllUsers()

        return users;
    }

    public static async createUser({name, email, password}) {
        if (!name || name.length <= 2){
            throw new BadRequestError('the user name is invalid!!!');
        }
        if (!validate(email)) {
            throw new BadRequestError('the user email is invalid!!!');
        }
        if (!password || password.length <= 7){
            throw new BadRequestError('the user password is invalid!!!');
        }

        const user = await userRepository.createUser({name, email, password});
        return user;
    }

    public static async deleteUser(id: string) {
        const user = await userRepository.deleteUser(id);
    }

    public static async findUserById(id: string) {
        const user = await userRepository.findUserById(id);
        return user;
    }

    public static async userUpdate({id, name, email, password}) {
        if (!name || name.length <= 2){
            throw new BadRequestError('the user name is invalid!!!');
        }
        if (!validate(email)) {
            throw new BadRequestError('the user email is invalid!!!');
        }
        if (!password || password.length <= 7){
            throw new BadRequestError('the user password is invalid!!!');
        }

        await userRepository.userUpdate({id, name, email, password});
    }
}

export { UserService };