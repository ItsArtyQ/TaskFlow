import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, User } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto): Promise<User> {
    return this.authService.register(body.email, body.username, body.password);
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<User> {
    return this.authService.login(body.email, body.password);
  }
}
