import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
