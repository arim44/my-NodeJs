import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sayHi():string{
    return "안녕하세요~ 누구입니다.";
  } // 테스트 http://localhost:3000/say

  showProfile():string {
    return "안녕하세요 개인정보 보여드립니다.";
  }

  showPath():string {
    return "안녕하세요 경로 안내입니다."
  }
}
