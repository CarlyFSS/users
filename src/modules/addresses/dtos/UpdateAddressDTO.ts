import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export default class UpdateAddressDTO {
  @IsString()
  @IsOptional()
  @IsUUID()
  readonly user_id?: string;

  @IsUUID()
  @IsString()
  readonly address_id: string;

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
  @Length(4, 12)
  @IsOptional()
  readonly postal_code?: string;
}
