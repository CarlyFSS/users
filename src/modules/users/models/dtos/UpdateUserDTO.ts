import {
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  Length,
  IsUUID,
} from 'class-validator';

export default class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @Length(0, 100)
  @Matches("^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$", 'gi')
  readonly name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Length(0, 50)
  @Matches(
    '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
  )
  readonly email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 250)
  @Matches(
    '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*(){}\\-__+.]){1,}).{6,250}$',
    'gi',
    {
      message:
        'Must have at least: 6 characters, 1 Uppercase letter, 1 number and 1 of the following symbols "!@#$%^&*(){}-__+.)"',
    },
  )
  readonly password?: string;

  @IsOptional()
  @IsUUID('4')
  readonly main_address_id?: string;

  @IsOptional()
  @IsUUID('4')
  readonly phone_id?: string;
}
