import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, CloudinaryService, PrismaService],
})
export class CustomersModule {}
