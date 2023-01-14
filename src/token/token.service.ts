import { BadRequestException, GoneException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  public generateAccessToken(email: string): string {

    const payload = {
      email,
    };

    const option = {
      expiresIn: this.configService.get('JWT_EXPIRE'),
    };

    return this.jwtService.sign(payload, option);
  }

  async verifyToken(token: string) {
    try {

      return this.jwtService.verify(token);
    } catch (err) {

      switch (err.message) {
        case 'jwt must be provided':
          throw new BadRequestException('토큰이 전송되지 않았습니다');
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
          throw new UnauthorizedException('위조된 토큰입니다');
        case 'jwt expired':
          throw new GoneException('토큰이 만료되었습니다');
        default:

          Logger.error(err);
          throw new InternalServerErrorException('다시 시도해 주세요');
      }
    }
  }
}
