import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Kakao ID로 사용자 찾기
  async findUserByKakaoId(providerId: string) {
    return this.prisma.user.findUnique({
      where: { providerId: providerId.toString(), provider: 'kakao' },
    });
  }

  async validateKakaoUser(providerId: string) {
    let user = await this.findUserByKakaoId(providerId);

    if (!user) {
      user = await this.registerUser({ provider: 'kakao', providerId });
    }

    const payload = { userId: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { user, accessToken, refreshToken };
  }

  // 새로운 사용자 등록
  async registerUser(profileData: {
    provider: 'kakao' | string;
    providerId: string;
  }) {
    return this.prisma.user.create({
      data: {
        provider: profileData.provider,
        providerId: profileData.providerId.toString(),
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

  generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }
}
