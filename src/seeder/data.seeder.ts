import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DataSeeder {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async seed() {
    console.log('🌱 Seeding Super Admin, Roles, and Permissions...', {
      prisma: !!this.prisma,
      prismaKeys: this.prisma ? Object.keys(this.prisma).slice(0, 10) : [],
    });

    const modules = [
      'users',
      'roles',
      'customers',
      'rooms',
      'bookings',
      'payments',
    ];
    const actions = ['create', 'read', 'update', 'delete'];
    const permissionEntities: any[] = [];

    for (const module of modules) {
      for (const action of actions) {
        // Construct the unique action string matching your schema structure (e.g., "rooms:create")
        const actionString = `${module}:${action}`;

        let permission = await this.prisma.permission.findUnique({
          where: { action: actionString },
        });

        if (!permission) {
          permission = await this.prisma.permission.create({
            data: {
              action: actionString,
              description: `Allows ${action} operations on ${module}`,
            },
          });
        }
        permissionEntities.push(permission);
      }
    }

    // 2. Create Super Admin Role
    let superAdminRole = await this.prisma.role.findUnique({
      where: { name: 'superadmin' },
    });

    if (!superAdminRole) {
      superAdminRole = await this.prisma.role.create({
        data: { name: 'superadmin' },
      });
    }

    for (const perm of permissionEntities) {
      const exists = await this.prisma.rolePermission.findFirst({
        where: {
          roleId: superAdminRole.id,
          permissionId: perm.id,
        },
      });

      if (!exists) {
        await this.prisma.rolePermission.create({
          data: {
            roleId: superAdminRole.id,
            permissionId: perm.id,
          },
        });
      }
    }

    // 4. Create a Super Admin User if one doesn't exist
    await this.createDefaultAdminUser(superAdminRole.id);

    console.log('✅ Superadmin role and all permissions seeded successfully!');
  }

  private async createDefaultAdminUser(roleId: number) {
    const adminEmail = 'admin@example.com';
    const existingUser = await this.prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      await this.prisma.user.create({
        data: {
          email: adminEmail,
          name: 'System Administrator',
          password: hashedPassword,
          roleId: roleId,
        },
      });
      console.log(`👤 Created default user: ${adminEmail}`);
    }
  }
}
