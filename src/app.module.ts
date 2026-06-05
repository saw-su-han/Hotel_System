import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [SeederModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
