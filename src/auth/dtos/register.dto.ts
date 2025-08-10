import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmailUnique } from '../../common/decorators/is-email-unique.decorator';
import { UserRole } from '../../common/enums/roles.enum';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @IsEmailUnique({ message: 'Email already exists' })
  email: string;

  @ApiProperty({
    description: "User's password",
    example: '12345678',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User role',
    enumSchema: {
      description: 'There are following roles',
      default: UserRole.CLIENT,
    },
    example: UserRole.CLIENT,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @IsIn(Object.values(UserRole))
  role: string;

  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({ description: "User's first name", example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: "User's middle name", example: 'Snow' })
  @IsString()
  middleName: string;

  @ApiProperty({ description: "User's last name", example: 'Stark' })
  @IsString()
  lastName: string;
}
