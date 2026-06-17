import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser } from '../common/curent-user.decorator';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto, sellerId: number): Promise<{
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        id: number;
        sellerId: number;
    }>;
    findAll(): Promise<({
        seller: {
            name: string;
            id: number;
        };
        categories: {
            name: string;
            id: number;
        }[];
    } & {
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        id: number;
        sellerId: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        id: number;
        sellerId: number;
    }>;
    remove(id: number): string;
    addImage(productId: number, user: AuthUser, file: Express.Multer.File): Promise<{
        id: number;
        url: string;
    }>;
}
