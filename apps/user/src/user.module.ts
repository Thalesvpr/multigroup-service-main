import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServiceImpl } from './user.service';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserServiceImpl],
})
export class UserModule {}
