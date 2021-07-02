import { IsNotEmpty, IsString, IsEmail, IsNumberString } from 'class-validator';

export default class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly tenant_id?: string;

  @IsNotEmpty()
  @IsString()
  readonly role_id?: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly document_number: string;
}
