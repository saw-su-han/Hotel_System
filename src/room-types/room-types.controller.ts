import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RoomTypesService } from './room-types.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PermissionsGuard } from 'src/auth/guard/permission.guard';
import { RequirePermissions } from 'src/auth/decorators/permission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('room-types')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  // @RequirePermissions('room:create')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createRoomTypeDto: CreateRoomTypeDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.roomTypesService.create(createRoomTypeDto, imageFile);
  }

  @Get()
  findAll() {
    return this.roomTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomTypesService.findOne(Number(id));
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.roomTypesService.update(+id, updateRoomTypeDto, imageFile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTypesService.remove(+id);
  }
}
