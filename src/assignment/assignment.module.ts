import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Assignment } from 'src/entities/assignment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  providers: [AssignmentService],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
