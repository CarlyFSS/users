import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export default class UpdateRoleDTO {
  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
