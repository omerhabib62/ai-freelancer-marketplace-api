import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: "User's Signin email",
    example: 'omer.habib62@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's Signin password",
    example: '12345678',
  })
  @IsString()
  password: string;
}
