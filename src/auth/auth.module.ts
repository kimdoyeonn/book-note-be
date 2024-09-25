import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './kakao.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'kakao' })],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, PrismaService],
})
export class AuthModule {}
