import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class RoomTypesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(dto: CreateRoomTypeDto, imageFile: Express.Multer.File) {
    try {
      if (!imageFile) {
        throw new Error('Image file is missing');
      }

      const imageUrl = await this.cloudinary.uploadImageStream(imageFile);

      const roomType = await this.prisma.roomtypes.create({
        data: {
          roomType: dto.roomType,
          price: Number(dto.price),
          description: dto.description,
          imageUrl: imageUrl,
          size: dto.size,
          bathType: dto.bathType,
          viewType: dto.viewType,
        },
      });

      return roomType;
    } catch (error) {
      console.error('CREATE ROOM TYPE ERROR:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.roomtypes.findMany({
        where: {
          isDeleted: false,
        },
      });
    } catch (error) {
      console.error('FIND ALL ROOM TYPES ERROR:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.roomtypes.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });
    } catch (error) {
      console.error('FIND ONE ROOM TYPE ERROR:', error);
      throw error;
    }
  }

  async update(
    id: number,

    updateRoomTypeDto: UpdateRoomTypeDto,
    imageFile?: Express.Multer.File,
  ) {
    try {
      if (!imageFile) {
        throw new Error('Image file is missing');
      }

      const imageUrl = await this.cloudinary.uploadImageStream(imageFile);

      const update = await this.prisma.roomtypes.update({
        where: {
          id: id,
          isDeleted: false,
        },
        data: {
          price: Number(updateRoomTypeDto.price),
          description: updateRoomTypeDto.description,
          imageUrl: imageUrl,
        },
      });
      return update;
    } catch (error) {
      console.error('UPDATE ROOM TYPE ERROR:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      // Soft delete: update the flag instead of removing the record
      const updatedRoom = await this.prisma.roomtypes.update({
        where: {
          id,
          isDeleted: false, // Only allow updating if it isn't already soft-deleted
        },
        data: {
          isDeleted: true,
        },
      });

      return {
        message: 'Post has been successfully deleted',
        id: updatedRoom.id,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong while deleting these room_types data .id does not exist',
      );
    }
  }
}
