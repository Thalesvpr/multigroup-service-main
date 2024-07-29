import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthServiceImpl } from './auth.service';

import { ConfigModule } from '@nestjs/config';
import { SupabaseAuthProvider } from '../../../shared/services/auth/supabase/supabase.auth.provider';
import { AuthRepository } from './auth.repository';
import { ZodValidator } from 'shared/validation/zod.validation';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule global para este subprojeto
      envFilePath: './apps/auth/.env', // Especifique o caminho do seu arquivo .env
    }),
    PassportModule,
    JwtModule.register({
      secret: "FIXME:JWT_SECRET",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    // {
    //   provide: 'GRPC_INTERCEPTOR',
    //   useClass: AuthInterceptor,
    // },

    {
      provide: 'AuthProvider',
      useClass: SupabaseAuthProvider,
    },
    {
      provide: 'ValidationProvider',
      useClass: ZodValidator,
    },
    AuthRepository,
    SupabaseAuthProvider,


    JwtService,
    AuthServiceImpl,


  ],
  controllers: [AuthController],
  exports: [AuthServiceImpl]
})
export class AuthModule { }