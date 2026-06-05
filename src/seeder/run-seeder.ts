import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { DataSeeder } from './data.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(DataSeeder);
  await seeder.seed();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
