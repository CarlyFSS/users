import { IsString, IsEmail } from 'class-validator';

export default class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly document_number: string;

  @IsString({
    message: 'birthdate must be a string in the format DD/MM/YYYY',
  })
  readonly birthdate: Date;
}
