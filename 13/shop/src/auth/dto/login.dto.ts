import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

// /Post/auth/login 요청 본문 이메일과, 패워드 인증 -> username 받아도 됨
export class LoginDto {
    @ApiProperty({example: "seller@demo.com"})
    @IsEmail()
    email : string;

    @ApiProperty({example: "secret123"})
    @IsString()
    password : string;
}