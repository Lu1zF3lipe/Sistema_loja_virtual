import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDTO {
  @Length(3, 30)
  @IsOptional()
    name?: string;

  @IsEmail()
  @IsOptional()
    email?: string;

  @Length(8)
  @IsOptional()
    password?: string;
}
