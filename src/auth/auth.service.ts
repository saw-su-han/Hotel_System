import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { change_passworddto } from './dto/change-password.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      },
    });

    const token = this.generateTokens(newUser);
    return {
      message: 'Register successful',
      token,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.generateTokens(user);
    return {
      message: 'Login successful',
      token,
    };
  }
  private generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),

      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  // REFRESH TOKEN
  async refreshToken(token: string) {
    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user);
  }

  async changePwd(id: number, changedto: change_passworddto) {
    const { oldPwd, newPwd, confirmPwd } = changedto;

    // check old password

    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    const isMatch = await bcrypt.compare(oldPwd, user.password);
    if (!isMatch) {
      throw new BadRequestException('old password is wrong');
    }
    //new password and confirm

    if (newPwd !== confirmPwd) {
      throw new BadRequestException('Password do not match');
    }

    const hashedPassword = await bcrypt.hash(newPwd, 10);

    await this.prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });

    return {
      message: 'password changed successfully',
    };
  }

  async update(userId: number, dto: UpdateAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return {
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
      },
    };
  }
}
