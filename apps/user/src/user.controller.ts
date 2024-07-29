import { Controller, Get } from '@nestjs/common';
import { UserServiceImpl } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserServiceImpl) {}

  @GrpcMethod('UserService')
  CheckHealth() {
    return this.userService.CheckHealth();
  }
}
