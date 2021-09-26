import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import ValidationFactory from '../../../../shared/factories/ValidationFactory/ValidationFactory';
import AddressPropertiesEnum from '../enums/AddressPropertiesEnum';

const { REGEX_MODIFIER, UUID_VERSION, addressesValidationMap } =
  ValidationFactory();
const VALIDATION = addressesValidationMap;
const P = AddressPropertiesEnum;

export default class UpdateAddressDTO {
  @IsUUID(UUID_VERSION)
  user_id?: string;

  @IsUUID(UUID_VERSION)
  address_id?: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.COUNTRY).min, VALIDATION(P.COUNTRY).max)
  @Matches(VALIDATION(P.COUNTRY).regex, REGEX_MODIFIER)
  country?: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.STATE).min, VALIDATION(P.STATE).max)
  @Matches(VALIDATION(P.STATE).regex, REGEX_MODIFIER)
  state?: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.CITY).min, VALIDATION(P.CITY).max)
  @Matches(VALIDATION(P.CITY).regex, REGEX_MODIFIER)
  city?: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.STREET).min, VALIDATION(P.STREET).max)
  @Matches(VALIDATION(P.STREET).regex, REGEX_MODIFIER)
  street?: string;

  @IsNumber()
  @IsOptional()
  @Length(VALIDATION(P.NUMBER).min, VALIDATION(P.NUMBER).max)
  number?: number;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.NEIGHBORHOOD).min, VALIDATION(P.NEIGHBORHOOD).max)
  @Matches(VALIDATION(P.STATE).regex, REGEX_MODIFIER)
  neighborhood?: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.COMPLEMENT).min, VALIDATION(P.COMPLEMENT).max)
  @Matches(VALIDATION(P.COMPLEMENT).regex, REGEX_MODIFIER)
  complement?: string;

  @IsNumberString()
  @IsOptional()
  @Length(VALIDATION(P.ZIP_CODE).min, VALIDATION(P.ZIP_CODE).max)
  @Matches(VALIDATION(P.ZIP_CODE).regex, REGEX_MODIFIER)
  zip_code?: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.DESCRIPTION).min, VALIDATION(P.DESCRIPTION).max)
  @Matches(VALIDATION(P.DESCRIPTION).regex, REGEX_MODIFIER)
  description?: string;
}
