import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

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
  @Length(4, 12)
  readonly postal_code: string;
}
