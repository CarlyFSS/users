import { IsString, IsEmail, IsOptional } from 'class-validator';

export default class UpdateUserDTO {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}
