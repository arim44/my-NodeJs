import "dotenv/config"; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //whitelist (dto에 없는 필드 자동 제거)
  app.useGlobalPipes(new ValidationPipe({whitelist:true, transform:true}));

  const config = new DocumentBuilder()
    .setTitle("쇼핑몰 API(realtion 추가")
    .setDescription("12장 판매자 1:N, 분류 M:N")
    .setVersion("1.0")
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`prisma 관계형 쇼핑몰 시작 : Http://localhost:${process.env.PORT} (Swagger 문서: /docs)`);
}
bootstrap();
