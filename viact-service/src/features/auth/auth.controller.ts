import { Controller, Post, Version, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_V1 } from '../../common/contants';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRefreshTokenDto } from './auth.dto';
import { User } from '../user/user.entity';
import { Public } from './auth.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @Version(API_V1)
  async login(@Body() authLoginDto: AuthLoginDto): Promise<User | object> {
    return this.authService.login(authLoginDto);
  }

  @Public()
  @Post('refresh-token')
  @Version(API_V1)
  async refreshToken(
    @Body() authRefreshTokenDto: AuthRefreshTokenDto,
  ): Promise<object> {
    return this.authService.refreshToken(authRefreshTokenDto);
  }
}
