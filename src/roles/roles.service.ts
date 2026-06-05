import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const role = await this.prisma.role.create({
      data: {
        name: dto.name,
        rolePermissions: {
          create: dto.permissionIds.map((permissionId) => ({
            permissionId,
          })),
        },
      },
      include: {
        rolePermissions: { include: { permission: true } },
      },
    });
    return role;
  }

  async findAll() {
    return this.prisma.role.findMany({
      select: {
        rolePermissions: {
          select: {
            id: true,
            permission: true,
          },
        },
      },
      // include: {
      //   rolePermissions: { include: { permission: true } },
      // },
    });
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      select: {
        rolePermissions: {
          select: {
            roleId: true,
            permissionId: true,
            permission: true,
          },
        },
      },
      // include: {
      //   rolePermissions: { include: { permission: true } },
      // },
    });
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);
    return role;
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    const operations: Promise<unknown>[] = [];

    if (dto.name !== undefined) {
      operations.push(
        this.prisma.role.update({
          where: { id },
          data: { name: dto.name },
        }),
      );
    }

    if (dto.addPermissionIds?.length) {
      operations.push(
        this.prisma.rolePermission.createMany({
          data: dto.addPermissionIds.map((permissionId) => ({
            roleId: id,
            permissionId,
          })),
          skipDuplicates: true,
        }),
      );
    }

    if (dto.removePermissionIds?.length) {
      operations.push(
        this.prisma.rolePermission.deleteMany({
          where: {
            roleId: id,
            permissionId: { in: dto.removePermissionIds },
          },
        }),
      );
    }

    await Promise.all(operations);

    return this.findOne(id);
  }

  async remove(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException(`Role with id ${id} not found`);

    await this.prisma.rolePermission.deleteMany({ where: { roleId: id } });
    await this.prisma.role.delete({ where: { id } });
    return { message: `Role with id ${id} deleted successfully` };
  }
}
