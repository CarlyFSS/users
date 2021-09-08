import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

const POSTAL_CODE_MAX_LENGTH = 12;
const POSTAL_CODE_MIN_LENGTH = 4;

export default class UpdateAddressDTO {
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly user_id?: string;

  @IsUUID()
  @IsOptional()
  @IsString()
  readonly address_id?: string;

  @IsString()
  @IsOptional()
  readonly country?: string;

  @IsString()
  @IsOptional()
  readonly state?: string;

  @IsString()
  @IsOptional()
  readonly city?: string;

  @IsString()
  @IsOptional()
  readonly street?: string;

  @IsNumber()
  @IsOptional()
  readonly number?: number;

  @IsString()
  @IsOptional()
  readonly district?: string;

  @IsString()
  @IsOptional()
  readonly complement?: string;

  @IsNumberString()
  @Length(POSTAL_CODE_MIN_LENGTH, POSTAL_CODE_MAX_LENGTH)
  @IsOptional()
  readonly postal_code?: string;
}
