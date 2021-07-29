import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserI } from 'src/entities/interfaces/user.interface';
import { map, switchMap } from 'rxjs/operators';
import { LoginUserDto } from './dto/LoginUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  create(createdUserDto: CreateUserDto): Observable<UserI> {
    return this.mailExists(createdUserDto.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(createdUserDto.password).pipe(
            switchMap((passwordHash: string) => {
              // Overwrite the user password with the hash, to store it in the db
              createdUserDto.password = passwordHash;
              return from(this.usersRepository.save(createdUserDto)).pipe(
                map((savedUser: UserI) => {
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException('Email already in use', HttpStatus.CONFLICT);
        }
      }),
    );
  }

  login(loginUserDto: LoginUserDto): Observable<string> {
    return this.findUserByEmail(loginUserDto.email).pipe(
      switchMap((user: UserI) => {
        if (user) {
          return this.validatePassword(
            loginUserDto.password,
            user.password,
          ).pipe(
            switchMap((passwordsMatches: boolean) => {
              if (passwordsMatches) {
                return this.findOne(user.id).pipe(
                  switchMap((user: UserI) =>
                    this.authService.generateJwt(user),
                  ),
                );
              } else {
                throw new HttpException(
                  'Login was not Successfull',
                  HttpStatus.UNAUTHORIZED,
                );
              }
            }),
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }),
    );
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.usersRepository.save(createUserDto);
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findAllAlphabeticalorder(): Promise<User[]> {
    return await this.usersRepository.find({
      order: { firstName: 'ASC' },
    });
  }

  async findOrderByMostpopular(): Promise<UserI[]> {
    return await this.usersRepository.find({
      order: { firstName: 'DESC' },
    });
  }

  async findByFirstName(user: User): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstName'],
      where: { firstName: user.firstName },
    });
  }

  async getUser(_id: number): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['firstName'],
      where: [{ id: _id }],
    });
  }

  async update(user: User) {
    this.usersRepository.update(user.id, user);
    return `Updated user id: ${user.id} new name: ${user.firstName} `;
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
    return `---User deleted---`;
  }

  async findByMail(email: string): Promise<Observable<User>> {
    return from(this.usersRepository.findOne({ email }));
  }

  private mailExists(email: string): Observable<boolean> {
    return from(this.usersRepository.findOne({ email })).pipe(
      map((user: UserI) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }
  findUserByEmail(email: string): Observable<UserI> {
    return from(
      this.usersRepository.findOne(
        { email },
        { select: ['id', 'email', 'userName', 'password'] },
      ),
    );
  }

  validatePassword(
    password: string,
    storedPassword: string,
  ): Observable<boolean> {
    return this.authService.comparePasswords(password, storedPassword);
  }

  findOne(id: number): Observable<UserI> {
    return from(this.usersRepository.findOne({ id }));
  }
}
