import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      // Login 에서 sign() jwt token 만들기 위한 시크릿 정보
      secret: jwtContants.secret,
      // 토큰 유효 기간 설정 (access_token 은 짧게 1시간, refresh_token 길게 14일)
      signOptions: {expiresIn: "14d"}
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
