// tslint:disable: max-classes-per-file
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export class CredentialsDTO {
  @IsString()
  @MinLength(4, {
    message: 'Your username must be at least 4 characters',
  })
  @IsNotEmpty()
  username: string;

  @Length(1, 8, {
    message: 'Your password must be between 1 and 8 characters.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserDetailsDTO {
  @IsString()
  @MinLength(4, {
    message: 'Your username must be at least 4 characters',
  })
  @IsNotEmpty({ message: 'Your username can not be blank.' })
  username: string;

  @Length(1, 8, {
    message: 'Your password must be between 1 and 8 characters.',
  })
  @IsString()
  @IsNotEmpty({ message: 'Your password can not be blank.' })
  password: string;

  @IsEmail(undefined, { message: 'Invalid email message' })
  @IsNotEmpty({ message: 'Your email can not be blank.' })
  email: string;
}

export class LoginResponseDTO {
  @IsString()
  @IsNotEmpty()
  token: string;
}
