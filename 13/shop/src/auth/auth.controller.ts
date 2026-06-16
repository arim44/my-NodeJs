import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { register } from 'module';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("register")
    @ApiOperation({summary: "회원가입"})
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post("login")
    @ApiOperation({summary: "로그인"})
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
