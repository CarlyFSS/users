import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

const POSTAL_CODE_MAX_LENGTH = 12;
const POSTAL_CODE_MIN_LENGTH = 4;

export default class CreateAddressDTO {
  @IsString()
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumber()
  @IsNotEmpty()
  readonly number: number;

  @IsString()
  @IsNotEmpty()
  readonly district: string;

  @IsString()
  @IsOptional()
  readonly complement: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(POSTAL_CODE_MIN_LENGTH, POSTAL_CODE_MAX_LENGTH)
  readonly postal_code: string;
}
