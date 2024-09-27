import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  // refreshToken 검증
  async validate(req: Request, payload: any) {
    const refreshToken = req.cookies.refreshToken;
    // 사용자가 존재하는지 확인
    const user = await this.authService.findUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    // 서버에 저장된 refresh token과 일치하는지 확인
    if (!user.refreshToken || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = this.authService.generateAccessToken({
      userId: user.id,
      username: user.username,
    });

    return { user, accessToken };
  }
}
