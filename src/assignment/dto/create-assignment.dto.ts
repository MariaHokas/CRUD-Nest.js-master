import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  assignment_number: number;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsInt()
  @IsNotEmpty()
  assignment_owner_id: number;

  @IsString()
  @IsOptional()
  description?: string;
}
