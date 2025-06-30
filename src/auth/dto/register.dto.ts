import { Address } from './../../../generated/prisma/index.d';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  address: Address;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
