import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private supabaseClient: SupabaseClient) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const type = context.getType();
    if (type === 'rpc') {
      const call = context.switchToRpc().getContext();
      const metadata = call.metadata.getMap();
      const token = metadata['authorization']?.toString();

      if (!token) {
        throw new RpcException('No token provided');
      }

      const { data: user, error } = await this.supabaseClient.auth.getUser(token);
      if (error) {
        throw new RpcException('Invalid token');
      }

      // Attach user information to context or handle as needed
      context.switchToHttp().getRequest().user = user;
    }

    return next.handle();
  }
}
