import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dto: CreateCustomerDto,
    files: {
      nrcFront?: Express.Multer.File[];
      nrcBack?: Express.Multer.File[];
    },
  ) {
    const frontFile = files.nrcFront?.[0];
    const backFile = files.nrcBack?.[0];

    if (!frontFile || !backFile) {
      throw new BadRequestException('NRC front and back images are required');
    }

    const existingCustomer = await this.prisma.customers.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existingCustomer) {
      throw new ConflictException('Email or phone already exists');
    }

    const frontUpload =
      await this.cloudinaryService.uploadImageStream(frontFile);

    const backUpload = await this.cloudinaryService.uploadImageStream(backFile);

    return this.prisma.customers.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        nrcFront: frontUpload,
        nrcBack: backUpload,
      },
    });
  }
  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
