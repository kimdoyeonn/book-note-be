import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Kakao ID로 사용자 찾기
  async findUserByKakaoId(providerId: string) {
    return this.prisma.user.findUnique({
      where: { providerId: providerId.toString(), provider: 'kakao' },
    });
  }

  async validateKakaoUser(providerId: string, refreshToken: string) {
    // 카카오 사용자 정보를 서버 사용자와 연동
    const user = await this.findUserByKakaoId(providerId);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return user;
  }

  // 새로운 사용자 등록
  async registerUser(profileData: {
    provider: 'kakao' | string;
    providerId: string;
    refreshToken: string;
  }) {
    return this.prisma.user.create({
      data: {
        provider: profileData.provider,
        providerId: profileData.providerId.toString(),
        refreshToken: profileData.refreshToken,
      },
    });
  }

  async updateUserRefreshToken(
    userId: number,
    { refreshToken }: { refreshToken: string },
  ) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
