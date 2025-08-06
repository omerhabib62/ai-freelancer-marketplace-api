import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';
import { UserRole } from '../../common/entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsIn(Object.values(UserRole))
  role: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
