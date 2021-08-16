import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export default class UpdateUserDTO {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @Exclude()
  readonly password: string;
}
