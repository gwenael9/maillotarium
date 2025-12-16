import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = 4000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés qui ne sont pas dans le DTO
      forbidNonWhitelisted: true, // Renvoie une erreur si des propriétés inconnues sont envoyées
      transform: true, // Transforme les types (ex: string vers number pour les ID)
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
