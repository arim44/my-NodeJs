"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("쇼핑몰 API(realtion 추가")
        .setDescription("12장 판매자 1:N, 분류 M:N")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    swagger_1.SwaggerModule.setup("docs", app, swagger_1.SwaggerModule.createDocument(app, config));
    await app.listen(process.env.PORT ?? 3000);
    console.log(`prisma 관계형 쇼핑몰 시작 : Http://localhost:${process.env.PORT} (Swagger 문서: /docs)`);
}
bootstrap();
//# sourceMappingURL=main.js.map