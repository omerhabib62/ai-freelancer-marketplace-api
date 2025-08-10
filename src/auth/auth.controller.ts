import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { LogoutDto } from './dtos/logout.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UsersService } from '../users/users.service';
import { AuthorizedUser } from './interfaces/authorized-user.interface';
import { UserRole } from '../common/enums/roles.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly loggerService = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register on platform as Client or Freelancer',
  })
  @ApiBody({ type: RegisterDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body(ValidationPipe) dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // Restricted to admin only
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('all-users')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  async getAllUsers() {
    return this.userService.findAllUsers();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login to the platform' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    schema: {
      properties: {
        accessToken: { type: 'string' },
        sessionId: { type: 'string' },
        user: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Request() req, @Body() loginDto: LoginDto) {
    const authorize: AuthorizedUser = await this.authService.authorize(
      this.userService,
      loginDto,
    );
    if (!authorize.success) {
      return {
        success: false,
        message: authorize.message,
        data: null,
      };
    }

    return this.authService.login(
      authorize.data,
      `Login from ${req.headers['user-agent'] || 'unknown device'}`,
    );
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiBody({
    schema: {
      properties: {
        refreshToken: { type: 'string' },
      },
    },
  })
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout from the platform' })
  @ApiBody({ type: LogoutDto })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(@Request() req, @Body() logoutDto: LogoutDto) {
    return this.authService.logout(req.user.userId, logoutDto.sessionId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  @ApiOperation({ summary: 'Logout from all devices' })
  @ApiResponse({
    status: 200,
    description: 'Logged out from all devices successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logoutAll(@Request() req) {
    return this.authService.logoutAll(req.user.userId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async getSessions(@Request() req) {
    return this.authService.getUserSessions(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }
}
