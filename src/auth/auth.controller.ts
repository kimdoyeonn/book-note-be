import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    // Kakao 로그인으로 리다이렉트
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoCallback(@Req() req, @Res() res) {
    // Kakao 로그인 성공 시 처리

    res.cookie('refreshToken', req.user.refreshToken, {
      httpOnly: true, // 클라이언트에서 자바스크립트로 접근하지 못하게 함 (보안 강화)
      secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송 (프로덕션 환경에서 적용)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 쿠키의 만료 시간 설정 (예: 7일)
      sameSite: 'strict', // 같은 사이트에서만 쿠키가 전송되도록 설정
    });

    return res.json({ user: req.user });
  }
}
