import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hotel Management API')
    .setDescription(
      'The API documentation for the Hotel System backend application.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  5;

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs-raw', app, document);

  app.use(
    '/reference',
    apiReference({
      content: document,
      theme: 'default',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(5000);
}

// async function bootstrap() {
//   // serve static files from the "uploads" directory
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   app.useStaticAssets(join(process.cwd(), 'uploads'), {
//     prefix: '/images/',
//   });

//   // Enable DTO validation
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   //scalar
//   const config = new DocumentBuilder()
//     .setTitle('Hotel system')
//     .setDescription('Hotel System description')
//     .setVersion('1.0')
//     .addBearerAuth(
//       {
//         type: 'http',
//         scheme: 'bearer',
//         bearerFormat: 'JWT',
//       },
//       'access-token',
//     )
//     .addTag('')
//     .build();

//   const documentFactory = () => SwaggerModule.createDocument(app, config);

//   SwaggerModule.setup('api', app, documentFactory);

// }
bootstrap();
