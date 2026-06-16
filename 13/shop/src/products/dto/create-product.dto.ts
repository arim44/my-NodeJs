import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsString, Min, MinLength } from "class-validator";
import { SrvRecord } from "dns";

export class CreateProductDto {
    @ApiProperty({example: "무선 이어폰"})
    @IsString()
    @MinLength(1)
    name:string;
    
    @ApiProperty({example: "노이즈 캔슬링"})
    @IsString()
    @MinLength(1)
    description : string;

    @ApiProperty({example: 80000, description: "원 단위"})
    @IsInt()
    @Min(0)
    price : number;

    @ApiProperty({example: 10})
    @IsInt()
    @Min(0)
    stock : number;

    @ApiProperty({example: 1, description: "User Id"})
    @IsInt()
    sellerId : number;
    
    @ApiProperty({type: [Number], example: [1,2], description:"category Id"})
    @IsArray()
    @IsInt({each:true})
    categoryIds : number[];
}


