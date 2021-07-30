import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AssignmentModule } from './assignment/assignment.module';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ProductViewModule } from './product-view/product-view.module';

@Module({
  imports: [DBModule, UsersModule, AssignmentModule, AuthModule, ProductViewModule],
})
export class AppModule {}
