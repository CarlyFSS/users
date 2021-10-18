import {
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  Length,
  IsUUID,
} from 'class-validator';
import ValidationFactory from '../../../../shared/factories/ValidationFactory/ValidationFactory';
import UserProperties from '../enums/UserPropertiesEnum';

const { REGEX_MODIFIER, UUID_VERSION, usersValidationMap } =
  ValidationFactory();
const VALIDATION = usersValidationMap;
const P = UserProperties;

export default class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @Length(VALIDATION(P.NAME).min, VALIDATION(P.NAME).max)
  @Matches(VALIDATION(P.NAME).regex, REGEX_MODIFIER)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Length(VALIDATION(P.EMAIL).min, VALIDATION(P.EMAIL).max)
  @Matches(VALIDATION(P.EMAIL).regex, REGEX_MODIFIER)
  readonly email?: string;

  @IsOptional()
  @IsString()
  @Length(VALIDATION(P.PASSWORD).min, VALIDATION(P.PASSWORD).max)
  @Matches(
    VALIDATION(P.PASSWORD).regex,
    REGEX_MODIFIER,
    VALIDATION(P.PASSWORD).regex_message,
  )
  readonly password?: string;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly main_address_id?: string;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly phone_id?: string;
}
