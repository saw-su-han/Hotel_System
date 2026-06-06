import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, RefreshTokenDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { change_passworddto } from './dto/change-password.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Req() req, @Body() dto: change_passworddto) {
    return this.authService.changePwd(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  update(@Req() req, @Body() dto: UpdateAuthDto) {
    return this.authService.update(req.user.userId, dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }
}
