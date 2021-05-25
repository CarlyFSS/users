import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateTenantDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
