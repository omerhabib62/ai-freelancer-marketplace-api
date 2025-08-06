import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({
    description: 'Session ID to logout from',
    example: 'session:1234567890-abc123'
  })
  @IsNotEmpty()
  @IsString()
  sessionId: string;
}