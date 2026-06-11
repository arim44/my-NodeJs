import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 싱글톤으로 앱서비스 관리
  // 추가
  @Get("/say")  // app.get("/say", (req,res)=>{})
  getSayHi(): string {
    return this.appService.sayHi();
  }

  // 문제3 GET 요청 추가 /profile -> 응답을 "안녕하세요 개인정보 보여드립니다."
  @Get("/profile")
  getShowProfile():string{
    return this.appService.showProfile();
  }

  // 문제4 GET 요청 추가 /path -> 응답을 "안녕하세요 경로 안내입니다."
  @Get("/path")
  getShowPath():string {
    return this.appService.showPath();
  }
}

