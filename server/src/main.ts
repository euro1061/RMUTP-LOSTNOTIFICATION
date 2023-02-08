import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('RMUTP Lostnotification')
    .setDescription('API Documents')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
  await app.listen(7999);
}
bootstrap();
