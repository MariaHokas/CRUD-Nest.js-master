import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { Observable } from 'rxjs';
import { UserI } from 'src/entities/interfaces/user.interface';
import { LoginUserDto } from './dto/LoginUser.dto';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() createdUserDto: CreateUserDto): Observable<UserI> {
    return this.service.create(createdUserDto);
  }

  @Post('login')
  @HttpCode(200)
  // eslint-disable-next-line @typescript-eslint/ban-types
  login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
    return this.service.login(loginUserDto).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000,
        };
      }),
    );
  }

  @Post('t')
  createUser(@Body() user: CreateUserDto) {
    return this.service.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get('alphabeticalorder')
  findAllAlphabeticalorder(): Promise<User[]> {
    return this.service.findAllAlphabeticalorder();
  }

  @Get('mostpopular')
  findOrderByMostpopular(): Promise<UserI[]> {
    return this.service.findOrderByMostpopular();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() user: User): Promise<any> {
    user.id = Number(id);
    console.log('Update #' + user.id);
    return this.service.update(user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
