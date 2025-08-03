import { IsEmail, IsIn, IsString } from 'class-validator';
import { UserRole } from '../../common/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(Object.values(UserRole))
  role: string; // Will be validated against UserRole values

  @IsString()
  name: string;
}
