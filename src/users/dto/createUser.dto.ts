// import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
// import { LoginUserDto } from './loginUser.dto';

// export class CreateUserDto extends LoginUserDto {
//   @IsInt()
//   id: number;

//   @IsNotEmpty()
//   @IsString()
//   firstName: string;

//   @IsNotEmpty()
//   @IsString()
//   lastName: string;

//   @IsEmail()
//   email: string;

//   birthday: Date;

//   isActive: boolean;

//   @IsInt()
//   points: number;

//   created!: Date;

//   updated!: Date;

//   userName?: string;

//   password: string;
// }

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
