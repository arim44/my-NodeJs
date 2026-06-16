import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  //생성자
  constructor(private readonly prisma:PrismaService) {}
  
  // 카테고리 등록
  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where : {name: createCategoryDto.name}
    });
    if(exists) throw new ConflictException("이미존재하는 카테고리 입니다.");
    return this.prisma.category.create({data:createCategoryDto});
  }

  // 카테고리 전체 조회
  findAll() {
    return this.prisma.category.findMany({
      orderBy: {id: 'asc'}
    });
  }

  // 카테고리 하나만 조회
  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where : {id}
    });
    if(!category) throw new NotFoundException(`카테고리 ${id} 를 찾을수 없습니다.`);
    return category;
  }

  // 카테고리 업데이트
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // id로 하나 찾음
    await this.findOne(id);
    
    // 카테고리 이름이 언디파인드가 아니면
    if(updateCategoryDto.name !== undefined){
      const exists = await this.prisma.category.findUnique({
        where: {name: this.update.name}
      });
      if(exists && exists.id !== id) throw new ConflictException(`${updateCategoryDto.name} 이미 있는 분류 입니다.`);
    }
    return this.prisma.category.update({where: {id}, data:updateCategoryDto})
  }

  // 카테고리 삭제
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.category.delete({where : {id}});
    return {delete:id};
  }
}
