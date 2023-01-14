import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenService } from "../../token/token.service";
import User from "../../user/entity/user.entity";
import { UserService } from "../../user/user.service";

@Injectable()
export default class AuthGaurd implements CanActivate {

  constructor(
    private readonly tokenService: TokenService,
    private readonly userSerivce: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token: string | string[] = request.headers['authorization'];

    if (!token) {

      throw new UnauthorizedException('토큰이 전송되지 않았습니다');
    }

    if (Array.isArray(token)) {

      throw new UnauthorizedException('잘못된 토큰입니다');
    }

    const cuttingToken: string[] = token.split('Bearer ');

    if (!cuttingToken[0]) {

      throw new UnauthorizedException('잘못된 토큰입니다');
    }

    const { email } = await this.tokenService.verifyToken(cuttingToken[1]);

    const user: User = await this.userSerivce.findUserByemail(email);

    request.user = user;

    return true;
  }
}