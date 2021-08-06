import { IsString } from 'class-validator';
import { LoginUserDto } from './LoginUser.dto';

export class CreateUserDto extends LoginUserDto {
  @IsString()
  userName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
