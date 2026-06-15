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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        const extsis = await this.prisma.category.findUnique({
            where: { name: createCategoryDto.name }
        });
        if (extsis)
            throw new common_1.ConflictException(`${createCategoryDto.name}는(은) 이미 존재하는 카테고리 입니다.`);
        return this.prisma.category.create({ data: createCategoryDto });
    }
    findAll() {
        return this.prisma.category.findMany({
            orderBy: { id: 'asc' }
        });
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id }
        });
        if (!category)
            throw new common_1.NotFoundException(`카테고리 ${id} 를 찾을수 없습니다.`);
        return category;
    }
    async update(id, updateCategoryDto) {
        await this.findOne(id);
        if (updateCategoryDto.name !== undefined) {
            const exists = await this.prisma.category.findUnique({
                where: { name: this.update.name }
            });
            if (exists && exists.id !== id) {
                throw new common_1.ConflictException(`${updateCategoryDto.name} 이미 있는 분류 입니다.`);
            }
        }
        return this.prisma.category.update({ where: { id }, data: updateCategoryDto });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.category.delete({ where: { id } });
        return { delete: id };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map