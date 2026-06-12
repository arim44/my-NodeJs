import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {

  // 생성자
    constructor(private readonly prisma: PrismaService, 
      private categoriesService : CategoriesService) {}

    // 반환을 하나하나 할때는 async 안붙여도 됨
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({data: createProductDto});
  }

  async findAll(query: QueryProductDto) {
    const{page, limit} = query;
    // Promise.all() 2개를 동시에 계산해서 
    const [items, total]= await Promise.all([
      this.prisma.product.findMany({
        skip: (page -1)* limit, //offset
        take: limit, //limit
        orderBy: {id: "desc"}
      }),
      this.prisma.product.count() // select count(*) from products
    ]);
    return {items, total, page, limit, tatalPage: Math.ceil(total/limit)}
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
