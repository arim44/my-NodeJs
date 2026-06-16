import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  // 생성자
  constructor(private readonly prisma:PrismaService){};

  // 유저 등록
  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: {email: createUserDto.email}
    });
    // 이메일이 존재하면
    if(exists) throw new ConflictException("이미 가입된 이메일 입니다");
    return this.prisma.user.create({data:createUserDto});
  }

  // 전체 조회
  findAll() {
    return this.prisma.user.findMany({
      orderBy: {id:'asc'}
    });
  }

  // 1명만 조회
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where : {id}
    });
    if(!user) throw new NotFoundException(`사용자 아이디 ${id} 찾을 수 없습니다`);
    return user;
  }

  // 사용자 수정
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if(updateUserDto.name !== undefined){
      const exists = await this.prisma.user.findUnique({
        // 반드시 유니크 컬럼을 사용해야함
        where: {email : updateUserDto.email}
      });
      if(exists && exists.id !== id) {
        throw new ConflictException(`${updateUserDto.email} 이미 있는 사용자 입니다.`)
      };
    }
    return this.prisma.user.update({where : {id}, data: updateUserDto})
  }

  //사용자 삭제
  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.user.delete({where : {id}})
    return {delete: id};
  }

  // auth 추가
  // 회원가입 시 사용 목적
  async createUser(data: {email: string, name: string, password: string, role: Role}){
    return this.prisma.user.create({data});
  }

  // 로그인 시 사용 목적
  async findByEmail(email: string){
    return this.prisma.user.findUnique({where: {email}});
  }
}
