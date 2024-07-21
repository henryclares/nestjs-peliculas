import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: RegisterUserDto) {
    return await this.authService.signUp(body);
  }

  @Post('sign-in')
  async login(@Body() body: { user: string; password: string }) {
    return await this.authService.signIn(body.user, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req) {
    return await this.authService.getProfile(req.user.sub);
  }
}
