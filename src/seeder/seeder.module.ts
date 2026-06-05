import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSeeder } from './data.seeder';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  providers: [DataSeeder],
  exports: [DataSeeder],
})
export class SeederModule {}
