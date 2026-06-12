import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//PrismaClient 를 nestjs 생명주기에 연결
// 모듈이 뜰 때 (prisma) DB 연결하고, 모듈이 내려갈때 DB연결을 닫는다.
@Injectable()
export class PrismaService  extends PrismaClient 
implements OnModuleInit, OnModuleDestroy {
    // db 연결하고 끄는 작업
    async onModuleInit() {
        // db 연결
        await this.$connect(); // prisma client 가 커넥션플링을 관리
    }

    async onModuleDestroy() {
        // db 연결 해제
        await this.$disconnect();
    }
}
