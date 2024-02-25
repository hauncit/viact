import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_V1, SWAGGER_TOKEN_NAME } from '../../common/contants';
import { Public } from '../auth/auth.decorator';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Version(API_V1)
  // @ApiBearerAuth(SWAGGER_TOKEN_NAME)
  @Public()
  @ApiResponse({
    type: CreateUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto | object> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth(SWAGGER_TOKEN_NAME)
  @Version(API_V1)
  @ApiResponse({
    type: CreateUserDto,
  })
  async findAll(): Promise<User[] | object> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth(SWAGGER_TOKEN_NAME)
  @Version(API_V1)
  @ApiResponse({
    type: User,
  })
  @Public()
  async findOne(@Param('id') id: string): Promise<User | object> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Version(API_V1)
  @ApiBearerAuth(SWAGGER_TOKEN_NAME)
  @ApiResponse({
    type: UpdateUserDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | object> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Version(API_V1)
  @ApiBearerAuth(SWAGGER_TOKEN_NAME)
  @ApiResponse({
    type: CreateUserDto,
  })
  async delete(@Param('id') id: string): Promise<User | object> {
    return this.userService.delete(id);
  }
}
