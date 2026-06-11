
import { IsOptional, isString, IsString, minLength, MinLength } from "class-validator";

// 게시글을 입력받을 형태를 잡는거
export class CreatePostDto {
    @IsString()     // 이건 스트링이야
    @MinLength(1)  //최소 글자는 1개이상
    title : string;

    @IsString()     // 이건 스트링이야
    @MinLength(1)  //최소 글자는 1개이상
    content : string;

    @IsOptional()
    @IsString()
    author?: string;
}

