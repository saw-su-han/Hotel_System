import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

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

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs-raw', app, document);

  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'purple',
      layout: 'modern',
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Swagger UI is running on: http://localhost:${port}/docs-raw`);
  console.log(`Scalar is running on: http://localhost:${port}/reference`);
}
bootstrap();
