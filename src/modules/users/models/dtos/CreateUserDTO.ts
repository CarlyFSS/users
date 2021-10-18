import {
  IsString,
  IsEmail,
  Matches,
  Length,
  IsUUID,
  IsOptional,
} from 'class-validator';
import ValidationFactory from '../../../../shared/factories/ValidationFactory/ValidationFactory';
import UserProperties from '../enums/UserPropertiesEnum';

const { REGEX_MODIFIER, UUID_VERSION, usersValidationMap } =
  ValidationFactory();
const VALIDATION = usersValidationMap;
const P = UserProperties;

export default class CreateUserDTO {
  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly role_id?: string;

  @IsString()
  @Length(VALIDATION(P.NAME).min, VALIDATION(P.NAME).max)
  @Matches(VALIDATION(P.NAME).regex, REGEX_MODIFIER)
  readonly name!: string;

  @IsString()
  @IsEmail()
  @Length(VALIDATION(P.EMAIL).min, VALIDATION(P.EMAIL).max)
  @Matches(VALIDATION(P.EMAIL).regex, REGEX_MODIFIER)
  readonly email!: string;

  @IsString()
  @Length(VALIDATION(P.PASSWORD).min, VALIDATION(P.PASSWORD).max)
  @Matches(
    VALIDATION(P.PASSWORD).regex,
    REGEX_MODIFIER,
    VALIDATION(P.PASSWORD).regex_message,
  )
  readonly password!: string;

  @IsString()
  @Length(
    VALIDATION(P.DOCUMENT).min,
    VALIDATION(P.DOCUMENT).max,
    VALIDATION(P.DOCUMENT).length_message,
  )
  @Matches(
    VALIDATION(P.DOCUMENT).regex,
    REGEX_MODIFIER,
    VALIDATION(P.DOCUMENT).regex_message,
  )
  readonly document_number!: string;

  @IsString({
    message: VALIDATION(P.BIRTHDATE).regex,
  })
  @Length(
    VALIDATION(P.BIRTHDATE).min,
    VALIDATION(P.BIRTHDATE).max,
    VALIDATION(P.BIRTHDATE).length_message,
  )
  @Matches(
    VALIDATION(P.BIRTHDATE).regex,
    REGEX_MODIFIER,
    VALIDATION(P.BIRTHDATE).regex_message,
  )
  readonly birthdate!: Date;
}
