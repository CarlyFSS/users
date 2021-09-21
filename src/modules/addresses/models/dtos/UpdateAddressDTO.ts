import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

const ZIP_CODE_MAX_LENGTH = 12;
const ZIP_CODE_MIN_LENGTH = 4;

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
  readonly neighborhood?: string;

  @IsString()
  @IsOptional()
  readonly complement?: string;

  @IsNumberString()
  @Length(ZIP_CODE_MIN_LENGTH, ZIP_CODE_MAX_LENGTH)
  @IsOptional()
  readonly zip_code?: string;
}
