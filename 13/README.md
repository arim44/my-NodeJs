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
# JWT 인증 추가
# Auth

## 1. 관련 패키지 설치

- npm i @nestjs/jwt@11 @nestjs/passport@11 passport@0.7 passport-jwt@4 bcrypt@6
- npm i -D @types/passport-jwt@4 @types/bcrypt@6

## 2. .env JWT 시크릿 추가

- .env
    
    JMT_SECRET='dev-secret-cahnge-me’
    

## 3. 관련 모듈 생성

- nest g module auth
- nest g service auth --no-spec
- nest g controller auth --no-spec
- nest g guard auth/guards/jwt-auth --no-spec

## 4. schema 수정

```
// auth 추가
enum Role {
  BUYER //구매자(기본)
  SELLER // 판매자
  ADMIN // 관리자
}

// 유저
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String    @default("pw1234") //auth 추가 bcrypt 암호할 예정
  name      String
  products  Product[] //사용자가 판매자로 등록한 상품들
  createdAt DateTime  @default(now())
}
```

- 터미널에서

```bash
npx prisma format
npx prisma migrate dev --name add-auth
npx prisma generate
```

## 5. UserService

- 5.1 createUser, findByEmail 추가 
- 5.2 UserModule UserService exports

## 6. Auth 모듈

```
cd auth 
mkdir dto
cd dto
create login.dto.ts
create register.dto.ts

vi src/auth/constants.ts

auth.module.ts 에서 몇 가지 임포트 
auth.service.ts
```

## Order

- prisma/schema.prisma 수정
    
    ```
    
    // 주문(order) 추가
    enum OrderStatus {
      PENDING
      PAID
      SHIPPED
      DONE        // 완료
      CANCELLED   // 취소
    }
    
    // 카트 아이템
    model CartItem {
      id Int @id @default(autoincrement())
      userId Int
      user User @relation(fields: [userId], references: [id], onDelete: Cascade)
      productId Int
      product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
      quantity Int
    
      @@unique([userId, productId])
    }
    
    // 주문(order) 추가
    model Order {
      id Int @id @default(autoincrement())
      buyerId Int
      buyer User @relation(fields: [userId], references: [id], onDelete: Cascade)
      status OrderStatus @default(PENDING)
      totalPrice Int
      items OrderItem[]
      createdAt DateTime @default(now())
    }
    
    // 주문 아이템
    model OrderItem {
      id Int @id @default(autoincrement())
      orderId Int
      order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)
      productId Int
      product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
      quantity Int
      unitPrice Int
    }
    ```
    

스키마 수정 후

- npx prisma format → 포맷 후 에러 없으면 다음 진행
- npx prisma migrate dev --name add-order
- npx prisma generate

## order 모듈 추가

- nest g resource orders --no-spec
- nest g resource carts --no-spec

<aside>

POST /products/1/images Content-Type: multipart/form-data; boundary=----... ------... Content-Disposition: form-data; name="image"; filename="photo.png" Content-Type: image/png (바이너리 데이터) ------...

POST /products/1/images -F image = sky.png

1. JwtAuthGurd : 인증이 되어 있는지 체크
2. FileInterceptor (product.controller)
    - image 필드 + imageUploadOptions multer 2-1) 멀터 내부에서 multipart 파싱 -> fileFiler(_req, file, callbakc) 실행 -> 유효한 파일(사이즈도 5메가 이내ㅡ 파일명도 정확하면 -> diskStorage upload/.png
3. addImage (product.controller.ts) 3-1) @UploadedFile file > multipart 파일 객체
4. product service addImage 4-1) 제품정보 확인후에 ProductImage 저장
</aside>

