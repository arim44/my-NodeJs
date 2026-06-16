import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { emit } from 'process';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
                private readonly jwtService: JwtService
    ) { }

    // 회원 가입
    async register(dto: RegisterDto) {
        const exists = await this.userService.findByEmail(dto.email);
        if(exists) throw new ConflictException("이미 가입된 이메일 입니다.");

        const hashed = await bcrypt.hash(dto.password, 10);
        // 유저생성
        const user = await this.userService.createUser({
            email: dto.email,
            name: dto.name,
            password : hashed,//dto.password,
            role: dto.role ?? "BUYER"
        });
        // 비밀번호 빼고, 나머지 데이터 반환
        const {password, ...result} = user;
        return result;
    }

    // 로그인
    async login(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);
        // 패스워드랑 해시로된 패스워드 비교
        const isRight = await bcrypt.compare(dto.password, user!.password);

        if(!user || !isRight){
            throw new UnauthorizedException("이메일 또는 비밀번호가 틀립니다.")
        }
        
        const payload = {
            sub: user.id, email: user.email, role: user.role
        }

        return{
            access_token : this.jwtService.sign(payload)
        }
    }
}
