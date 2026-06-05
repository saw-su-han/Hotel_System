import { Injectable, OnModuleInit } from '@nestjs/common';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  findFirst(arg0: { where: { userId: number; postId: number } }) {
    throw new Error('Method not implemented.');
  }
  create(arg0: {
    data: {
      caption: string | undefined;
      user: { connect: { id: number } };
      images: { create: { url: string }[] };
    };
    include: { user: boolean; images: boolean };
  }) {
    throw new Error('Method not implemented.');
  }
  private readonly pool: Pool;
  User: any;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }
}
