# 프로젝트 생성

## 디렉토리 생성

- mkdir 13
- cd 13

## nest shop

- nest new shop --skip-git → npm
- cd shop

## 모듈 생성

- nest g resource categories --no-spec → rest api → y
- nest g resource products --no-spec → rest api → y
- nest g resource users --no-spec → rest api → y

## 패키지 설치

- npm i class-validator class-transformer dotenv
- npm i @prisma/client@6
- npm i -D prisma@6
- npm i @nestjs/swagger

## prisma generate

- npx prisma init
- npx prisma format

## 5. schema.prisma 모델설정

- schema.prisma
    
    ```
    // This is your Prisma schema file,
    // learn more about it in the docs: https://pris.ly/d/prisma-schema
    
    // Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
    // Try Prisma Accelerate: https://pris.ly/cli/accelerate-init
    
    generator client {
      provider = "prisma-client"
      output   = "../generated/prisma"
    }
    
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    
    // 유저
    model User {
      id        Int       @id @default(autoincrement())
      email     String    @unique
      name      String
      products  Product[] //사용자가 판매자로 등록한 상품들
      createdAt DateTime  @default(now())
    }
    
    // 카테고리(분류)
    model Category {
      id       Int       @id @default(autoincrement())
      name     String    @unique
      products Product[] // 자동으로 중간테이블 생성
    }
    
    // 상품(프로덕트)
    model Product {
      id          Int        @id @default(autoincrement())
      name        String
      description String
      price       Int
      stock       Int
      seller      User       @relation(fields: [sellerId], references: [id]) //prisma FK 제공
      sellerId    Int //진짜 외래키
      categories  Category[] //m:n 자동 중간 테이블 생성
      createdAt   DateTime   @default(now())
    }
    
    ```
    
- 스키마에 모델 작성 후
- npx prisma format 하면 자동 정렬 됨

## 6. 데이타베이스 생성(postgresql)

### db 이름 myshop

### DBeaver 에서 생성

- Databases → 우클릭 → create new Database

!image.png

- 이름 입력

!image.png

## 7. .env 에 설정

- DB 연결

```
// DATABASE_URL="postgresql://<사용자계정>:<비밀번호>@localhost:5432/myshop?schema=public"
PORT=3000

DATABASE_URL="postgresql://postgres:1111@localhost:5432/myshop?schema=public"
PORT=3000
```

## 터미널

- npx prisma migrate dev --name init
- npx prisma generate

## prisma Service

- nest g module prisma
- nest g service prisma --no-spec

## main.ts 추가

```tsx
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { transform } from 'typescript';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // whitelist 는 dto 에 없는 필드 자동 제거 
  // 만약 dto에 isAdmin이 없는데 클라이언트에서 isAdmin 보내면 자동 미시
  //transform : ?page=2 2문자열인데 숫자 2로 자동변환 service 에서 Number로 형 변화
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))

  const config = new DocumentBuilder()
    .setTitle("쇼핑몰 API (Relation 추가)")
    .setDescription("12장 판매자 1:N, 분류 M:N ")
    .setVersion("1.0")
    .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Prisma 관계형 쇼핑몰 시작 : Http://localhost:${process.env.PORT} (Swagger 문서: /docs)`);
}
bootstrap();

```