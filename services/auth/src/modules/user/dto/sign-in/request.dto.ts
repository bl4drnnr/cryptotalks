import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}
