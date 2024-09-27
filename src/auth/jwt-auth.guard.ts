import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    // context에서 request 객체를 가져옴
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    // Access Token이 없는 경우 예외 처리
    if (!authHeader) {
      throw new UnauthorizedException('AccessToken is missing');
    }

    // Bearer 형식 확인
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid accessToken format');
    }

    // 기본 인증 흐름 처리
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
