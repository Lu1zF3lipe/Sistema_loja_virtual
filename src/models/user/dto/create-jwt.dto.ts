import { IsEmail, Length } from 'class-validator';

export class CreateJwtDTO {
  id: string;

  @Length(3, 30)
    name: string;

  @IsEmail()
    email: string;
}
