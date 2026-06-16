import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        stock: number;
        sellerId: number;
    }>;
    findAll(): Promise<({
        categories: {
            id: number;
            name: string;
        }[];
        seller: {
            id: number;
            name: string;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        stock: number;
        sellerId: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string;
        price: number;
        stock: number;
        sellerId: number;
    }>;
    remove(id: number): string;
}
