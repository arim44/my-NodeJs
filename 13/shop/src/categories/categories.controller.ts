import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({summary:"쇼핑몰 카테고리 등록"})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({summary:"쇼핑몰 카테고리 전체조회"})
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:"쇼핑몰 카테고리 하나만조회"})
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary:"쇼핑몰 카테고리 수정"})
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"쇼핑몰 카테고리 삭제"})
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
