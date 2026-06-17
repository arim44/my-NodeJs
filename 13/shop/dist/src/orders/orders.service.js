"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkout(userId) {
        const cart = await this.prisma.cartItem.findMany({
            where: { userId: userId },
            include: { product: { select: { id: true, name: true, price: true } } }
        });
        if (cart.length === 0) {
            throw new common_1.BadRequestException("장바구니가 비어서 주문을 할수 없습니다.");
        }
        return this.prisma.$transaction(async (tx) => {
            let total = 0;
            const itemData = [];
            for (const item of cart) {
                const updated = await tx.product.updateMany({
                    where: { id: item.productId, stock: { gte: item.quantity } },
                    data: { stock: { decrement: item.quantity } }
                });
                if (updated.count === 0) {
                    throw new common_1.ConflictException(`재고가 부족합니다. ${item.product.name}`);
                }
                total += item.product.price * item.quantity;
                itemData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.product.price
                });
            }
            const order = await tx.order.create({
                data: {
                    buyerId: userId,
                    totalPrice: total,
                    items: { create: itemData }
                },
                include: { items: true }
            });
            await tx.cartItem.deleteMany({ where: { userId } });
        });
    }
    create(createOrderDto) {
        return 'This action adds a new order';
    }
    findAll() {
        return `This action returns all orders`;
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map