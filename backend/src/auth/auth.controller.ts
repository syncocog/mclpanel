import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string; twoFactorCode?: string }) {
    return this.authService.login(body.email, body.password, body.twoFactorCode);
  }

  @Post('register')
  async register(@Body() body: { email: string; username: string; password: string }) {
    return this.authService.register(body.email, body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable')
  async enable2FA(@Request() req) {
    return this.authService.enable2FA(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/verify')
  async verify2FA(@Request() req, @Body() body: { token: string }) {
    return this.authService.verify2FA(req.user.userId, body.token);
  }
}
