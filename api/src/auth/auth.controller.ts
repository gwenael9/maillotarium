import { Public } from '@/common/decorators/public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body('password') password: string) {
    return this.authService.login(password);
  }
}
