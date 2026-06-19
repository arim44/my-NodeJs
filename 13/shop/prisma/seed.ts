
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("admin1234", 10);

    // 있으면 업데이트 없으면 업서트
    const admin = await prisma.user.upsert({
        where: { email: "admin@demo.com" },
        update: {},
        create: {
            email: "admin@demo.com",
            password,
            name: "관리자",
            role: "ADMIN"
        }
    });
    console.log(`seed 완료: ${admin.email}`);
}

main()
    .catch((e) => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
//npm run seed