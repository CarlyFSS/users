import {
  IsString,
  IsEmail,
  Matches,
  Length,
  IsUUID,
  IsOptional,
} from 'class-validator';

export default class CreateUserDTO {
  @IsOptional()
  @IsUUID('4')
  readonly role_id?: string;

  @IsString()
  @Length(0, 100)
  @Matches("^[#.0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$", 'gi')
  readonly name: string;

  @IsString()
  @IsEmail()
  @Length(0, 50)
  @Matches(
    '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
  )
  readonly email: string;

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
  readonly password: string;

  @IsString()
  @Length(11, 11, {
    message: 'Document number must be 11 characters long',
  })
  @Matches('^([0-9]{11})$', 'g', {
    message: 'Document number must be a "String" with only numbers',
  })
  readonly document_number: string;

  @IsString({
    message: 'Birthdate must be a "String" in the format DD/MM/YYYY',
  })
  @Length(0)
  @Matches('^([0-9]{2}/[0-9]{2}/[0-9]{4})$', 'g', {
    message: 'birthdate must be in the format DD/MM/YYYY',
  })
  readonly birthdate: Date;
}
