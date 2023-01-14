import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import LoginDto from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { TokenService } from '../token/token.service';
import User from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) { }

  public async register(registerDto: RegisterDto): Promise<void> {

    const user: User | undefined = await this.userRepository.findByEmail(registerDto.email);

    if (user) {

      throw new ForbiddenException('중복된 계정입니다');
    }

    await this.userRepository.save(registerDto);
  }

  public async login(loginDto: LoginDto) {

    const user: User | undefined = await this.userRepository.findById(loginDto.email, loginDto.password);

    if (!user) {

      throw new UnauthorizedException('id 또는 pw가 일치하지 않습니다');
    }

    const token: string = this.tokenService.generateAccessToken(user.email);

    return { token };
  }

  public async findUserByemail(email: string) {

    const user: User | undefined = await this.userRepository.findByEmail(email);

    if (!user) {

      throw new NotFoundException('유저가 없습니다');
    }

    return user;
  }
}
