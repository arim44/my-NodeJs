import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, ParseIntPipe, UploadedFile, UnsupportedMediaTypeException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { type AuthUser, CurrentUser } from '../common/curent-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from '../common/upload.config';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "상품등록" })
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: AuthUser
    ) {  //, @Req() req:Request
    //생성아이디 자동
    console.log(user);
    return this.productsService.create(createProductDto, user.id);
  }

  // 첨부파일 이미지
  @Post(":id/images")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {image: { type: "string", format: "binary"}}
    }
  })
  @UseInterceptors(FileInterceptor("image", imageUploadOptions))
  addImage(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthUser
  ) {
    if(!file) throw new UnsupportedMediaTypeException("올릴 이미지가 업어요");
    // console.log(file)
    return this.productsService.addImage(id, user, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
