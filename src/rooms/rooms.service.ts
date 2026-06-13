import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const { roomNumber, roomTypeId } = createRoomDto;

    const existingRoom = await this.prisma.rooms.findUnique({
      where: { roomNumber },
    });

    if (existingRoom) {
      throw new ConflictException('Room number already exist');
    }

    // 2. check ACTIVE room type only
    const roomType = await this.prisma.roomtypes.findFirst({
      where: {
        id: roomTypeId,
        isDeleted: false,
      },
    });

    if (!roomType) {
      throw new NotFoundException(
        `Room type id ${roomTypeId} doesn't exist or is deleted`,
      );
    }

    // 3. create room ONLY if valid
    return this.prisma.rooms.create({
      data: {
        roomNumber,
        roomTypeId,
      },
      include: {
        roomType: true,
      },
    });
  }
  async findAll() {
    try {
      return await this.prisma.rooms.findMany({
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
    const room = await this.prisma.rooms.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        roomType: true,
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    return room;
  }
  async update(id: number, updateRoomDto: UpdateRoomDto) {
    // 1. check if room exists AND not deleted
    const room = await this.prisma.rooms.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with id ${id} doesn't exist`);
    }

    // 2. update
    return this.prisma.rooms.update({
      where: { id },
      data: {
        roomNumber: updateRoomDto.roomNumber,
      },
    });
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
        'Something went wrong while deleting these room data, Id does not exist',
      );
    }
  }
}
