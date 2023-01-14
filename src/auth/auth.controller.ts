import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({
    description: '로그인 성공',
  })
  async login(
    @Body() loginDto: LoginDto,
  ) {
    const loginResponse = await this.userService.login(loginDto);

    return loginResponse;
  }

  @Post('/register')
  @HttpCode(200)
  @ApiOkResponse({
    description: '회원가입이 완료되었습니다',
  })
  @ApiForbiddenResponse({ description: '중복된 계정입니다' })
  async register(
    @Body() registerDto: RegisterDto
  ) {

    await this.userService.register(registerDto);

    return;
  }
}