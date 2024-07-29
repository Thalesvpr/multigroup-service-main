import { Injectable } from '@nestjs/common';
import { HealthStatus, UserService } from '../proto/user';

@Injectable()
export class UserServiceImpl implements UserService {
  async CheckHealth(): Promise<HealthStatus> {
    return {status: 200}
  }

}
