import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
// import { CartsModule } from './carts/carts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_DIR } from './common/upload.config';
import { join } from 'path';
import { AzureModule } from './azure/azure.module';

@Module({
  imports: [CategoriesModule, ProductsModule, UsersModule, PrismaModule, AuthModule, OrdersModule,
    // //  업로드한 이미지를 그대로 내여주는 모듈 uploads/ => /uploads
    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), UPLOAD_DIR),  //.../shop/uploads
    //   serveRoot: "/uploads"
    // }),
    AzureModule,
  ],

  // 프로젝트 안에 있는 이미지 경로
  // http://localhost:3000/uploads/de049584-d536-409f-b827-8830a2f3fc46.png

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
