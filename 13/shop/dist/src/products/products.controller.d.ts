import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { type AuthUser } from '../common/curent-user.decorator';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, user: AuthUser): Promise<{
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        id: number;
        sellerId: number;
    }>;
    addImage(id: number, file: Express.Multer.File, user: AuthUser): Promise<{
        id: number;
        url: string;
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
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt: Date;
        id: number;
        sellerId: number;
    }>;
    remove(id: string): string;
}
