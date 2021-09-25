import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

const ZIP_CODE_MAX_LENGTH = 12;
const ZIP_CODE_MIN_LENGTH = 4;

export default class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  readonly country!: string;

  @IsString()
  @IsNotEmpty()
  readonly state!: string;

  @IsString()
  @IsNotEmpty()
  readonly city!: string;

  @IsString()
  @IsNotEmpty()
  readonly street!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly number!: number;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood!: string;

  @IsString()
  @IsOptional()
  readonly complement!: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(ZIP_CODE_MIN_LENGTH, ZIP_CODE_MAX_LENGTH)
  readonly zip_code!: string;

  readonly description!: string;
}
