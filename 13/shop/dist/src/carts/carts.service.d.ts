import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CartsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCartDto: CreateCartDto, userId: number): Promise<{
        id: number;
        productId: number;
        userId: number;
        quantity: number;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCartDto: UpdateCartDto): string;
    remove(id: number): string;
}
