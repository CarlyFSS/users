import { IsNotEmpty, IsString, IsEmail, IsNumberString } from 'class-validator';
import { Exclude } from 'class-transformer';

export default class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly tenant_id: string;

  @IsNotEmpty()
  @IsString()
  readonly role_id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  readonly password: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly document_number: string;

  @IsNotEmpty()
  @IsString()
  readonly sex: string;
}
