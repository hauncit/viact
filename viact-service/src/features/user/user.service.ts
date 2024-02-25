/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resError, resSuccess } from 'src/common/utils';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<User | object> {
    try {
      const existingUsername = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }

      if (createUserDto.phoneNumber) {
        const existingPhoneNumber = await this.userRepository.findOne({
          where: { phoneNumber: createUserDto.phoneNumber },
        });
        if (existingPhoneNumber) {
          throw new ConflictException('Phone number already exists');
        }
      }

      const existingEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await this.hashPassword(createUserDto.password);

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const createdUser = await this.userRepository.save(newUser);
      const {
        password,
        accessToken,
        refreshToken,
        ...userWithoutSensitiveInfo
      } = createdUser;

      return userWithoutSensitiveInfo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<User[] | object> {
    try {
      const users = await this.userRepository.find({
        where: { isDelete: false, isActive: true },
        select: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'phoneNumber',
        ],
      });
      return resSuccess(users);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<User | object> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, isDelete: false, isActive: true },
        select: [
          'id',
          'firstName',
          'lastName',
          'username',
          'email',
          'phoneNumber',
        ],
      });
      if (!user || user.isDelete) {
        return resError({ message: `User with id ${id} not found` });
      }
      return resSuccess(user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | object> {
    try {
      const updatedUser = await this.userRepository.save({
        ...updateUserDto,
        id,
      });
      return resSuccess(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<User | object> {
    try {
      const user = await this.userRepository.findOne({
        where: { id, isDelete: false },
      });
      if (!user || user.isDelete) {
        return resError(`User with id ${id} not found`);
      }
      user.isDelete = true;
      const deletedUser = await this.userRepository.save(user);
      return resSuccess(deletedUser);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
