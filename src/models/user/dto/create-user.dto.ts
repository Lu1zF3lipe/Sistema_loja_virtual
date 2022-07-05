import { IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @Length(3, 30)
    name: string;

  @IsEmail()
    email: string;

  @Length(8)
    password: string;
}
