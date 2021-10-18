import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import ValidationFactory from '../../../../shared/factories/ValidationFactory/ValidationFactory';
import AddressPropertiesEnum from '../enums/AddressPropertiesEnum';

const { REGEX_MODIFIER, addressesValidationMap } = ValidationFactory();
const VALIDATION = addressesValidationMap;
const P = AddressPropertiesEnum;

export default class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.COUNTRY).min, VALIDATION(P.COUNTRY).max)
  @Matches(VALIDATION(P.COUNTRY).regex, REGEX_MODIFIER)
  readonly country!: string;

  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.STATE).min, VALIDATION(P.STATE).max)
  @Matches(VALIDATION(P.STATE).regex, REGEX_MODIFIER)
  readonly state!: string;

  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.CITY).min, VALIDATION(P.CITY).max)
  @Matches(VALIDATION(P.CITY).regex, REGEX_MODIFIER)
  readonly city!: string;

  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.STREET).min, VALIDATION(P.STREET).max)
  @Matches(VALIDATION(P.STREET).regex, REGEX_MODIFIER)
  readonly street!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(VALIDATION(P.NUMBER).min)
  @Max(VALIDATION(P.NUMBER).max)
  readonly number!: number;

  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.NEIGHBORHOOD).min, VALIDATION(P.NEIGHBORHOOD).max)
  @Matches(VALIDATION(P.STATE).regex, REGEX_MODIFIER)
  readonly neighborhood!: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.COMPLEMENT).min, VALIDATION(P.COMPLEMENT).max)
  @Matches(VALIDATION(P.COMPLEMENT).regex, REGEX_MODIFIER)
  readonly complement!: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(VALIDATION(P.ZIP_CODE).min, VALIDATION(P.ZIP_CODE).max)
  @Matches(VALIDATION(P.ZIP_CODE).regex, REGEX_MODIFIER)
  readonly zip_code!: string;

  @IsString()
  @IsOptional()
  @Length(VALIDATION(P.DESCRIPTION).min, VALIDATION(P.DESCRIPTION).max)
  @Matches(VALIDATION(P.DESCRIPTION).regex, REGEX_MODIFIER)
  readonly description!: string;
}
