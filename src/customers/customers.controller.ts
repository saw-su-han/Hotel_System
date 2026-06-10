import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PermissionsGuard } from 'src/auth/guard/permission.guard';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('customers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'nrcFront', maxCount: 1 },
        { name: 'nrcBack', maxCount: 1 },
      ],
      {
        storage: memoryStorage(),
      },
    ),
  )
  create(
    @Body() dto: CreateCustomerDto,
    @UploadedFiles()
    files: {
      nrcFront?: Express.Multer.File[];
      nrcBack?: Express.Multer.File[];
    },
  ) {
    return this.customersService.create(dto, files);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
