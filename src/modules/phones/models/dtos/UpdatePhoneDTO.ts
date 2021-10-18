import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import ValidationFactory from '../../../../shared/factories/ValidationFactory/ValidationFactory';
import Entity from '../../../../shared/utils/enums/Entity';
import PhonePropertiesEnum from '../enums/PhonePropertiesEnum';

const { REGEX_MODIFIER, getEntityMap } = ValidationFactory();
const VALIDATION = getEntityMap(Entity.PHONE);
const P = PhonePropertiesEnum;

export default class UpdatePhoneDTO {
  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.COUNTRY_CODE).min, VALIDATION(P.COUNTRY_CODE).max)
  @Matches(VALIDATION(P.COUNTRY_CODE).regex, REGEX_MODIFIER)
  readonly country_code!: string;

  @IsString()
  @IsNotEmpty()
  @Length(VALIDATION(P.PREFIX).min, VALIDATION(P.PREFIX).max)
  @Matches(VALIDATION(P.PREFIX).regex, REGEX_MODIFIER)
  readonly prefix!: string;

  @IsNumber()
  @IsNotEmpty()
  @Length(VALIDATION(P.NUMBER).min, VALIDATION(P.NUMBER).max)
  @Matches(VALIDATION(P.NUMBER).regex, REGEX_MODIFIER)
  readonly number!: number;
}
