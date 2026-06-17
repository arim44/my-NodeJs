import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

//@UseGuard(JwtAuthGuard)
// AuthGuard("jwt") -> JwtStrategy 찾아서 jwt 전략을 돌린다
// 성공 req.user 채워지고 실패하면 401 ㅕㅜ며쇄걐ㅁㅅㄷㅇ
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){}
// 스트레이지와 가드 만들고 나면 밑에 줄 대신 위에 한줄로 끝
// export class JwtAuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }
