import { Module } from '@nestjs/common';
import { RoomTypesService } from './room-types.service';
import { RoomTypesController } from './room-types.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [RoomTypesController],
  providers: [RoomTypesService, PrismaService, CloudinaryService],
})
export class RoomTypesModule {}
