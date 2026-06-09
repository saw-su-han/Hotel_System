import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import cloudinary from 'src/cloudinary.config';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
