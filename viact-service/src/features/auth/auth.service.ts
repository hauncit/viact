import { User } from '../user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthRefreshTokenDto } from './auth.dto';
import { resError, resSuccess } from 'src/common/utils';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async login(authLoginDto: AuthLoginDto): Promise<User | object> {
    try {
      const user = await this.userRepository.findOne({
        where: [
          {
            username: authLoginDto?.username,
            isActive: true,
            isDelete: false,
          },
        ],
        select: [
          'id',
          'firstName',
          'lastName',
          'username',
          'password',
          'email',
          'phoneNumber',
        ],
      });

      if (!user) {
        throw new BadRequestException(`Incorrect login information`);
      }

      const isPasswordValid = await this.comparePasswords(
        authLoginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException(`Incorrect login information`);
      }

      const accessToken = this.jwtService.sign(
        { data: user },
        { expiresIn: '1h' },
      );
      const refreshToken = this.jwtService.sign(
        { data: user },
        { expiresIn: '7d' },
      );

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      await this.userRepository.save(user);

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async refreshToken(
    AuthRefreshTokenDto: AuthRefreshTokenDto,
  ): Promise<object> {
    try {
      const decodedRefreshToken = this.jwtService.verify(
        AuthRefreshTokenDto.refreshToken,
      );

      if (decodedRefreshToken?.data?._id) {
        const user = await this.userRepository.findOne({
          where: {
            id: decodedRefreshToken.data._id,
            isActive: true,
            isDelete: false,
          },
        });

        if (!user) {
          return resError({
            message: `User with id ${decodedRefreshToken?.data?.id} not found`,
          });
        }

        const accessToken = this.jwtService.sign({ data: user });

        user.accessToken = accessToken;

        await this.userRepository.save(user);

        return resSuccess({ accessToken });
      }

      throw new BadRequestException('Invalid refresh token');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
