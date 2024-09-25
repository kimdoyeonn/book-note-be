import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { AuthService } from './auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_CLIENT_KEY,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    // POST /oauth/token 요청에 대한 응답이 담깁니다.
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      const { _json } = profile;

      let user = await this.authService.findUserByKakaoId(_json.id.toString());

      if (!user) {
        user = await this.authService.registerUser({
          provider: 'kakao',
          providerId: _json.id.toString(),
          refreshToken,
        });
      } else {
        await this.authService.updateUserRefreshToken(user.id, {
          refreshToken,
        });
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
