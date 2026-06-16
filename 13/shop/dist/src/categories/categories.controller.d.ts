import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    remove(id: string): Promise<{
        delete: number;
    }>;
}
