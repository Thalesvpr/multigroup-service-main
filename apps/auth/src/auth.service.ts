import { Inject, Injectable } from '@nestjs/common';
import { IAuthProvider, IAuthService } from './auth.interface';
import { AuthData, AuthResponse, AuthService, HealthStatus, SignInPayload, SignUpPayload } from '../../../proto/generated/proto/auth';
import { AuthRepository } from './auth.repository';
import { IValidationProvider } from 'shared/validation/validation.interface';
import { ZodSchema } from 'zod';
import { ECondition } from 'shared/interfaces/resultResponse.interface';
import { sign } from 'crypto';
import { RegisterPayloadSchema } from './schemas/auth-payloads.schema';



@Injectable()
export class AuthServiceImpl  implements IAuthService{

  @Inject('AuthProvider') private readonly authProvider: IAuthProvider;
  private readonly authRepository: AuthRepository;
  @Inject('ValidationProvider') private readonly validaton: IValidationProvider;
  // private readonly usersRepository: UsersRepository;



  async CheckHealth(): Promise<HealthStatus> {
    return { status: 200}
  }

  async SignUp(signUpPayload: SignUpPayload): Promise<AuthData> {
    try {

    this.validaton.validate(signUpPayload, RegisterPayloadSchema)

    const authenticated = await this.authProvider.register(signUpPayload.email, signUpPayload.password);

    if(authenticated.condition == ECondition.ERROR) throw new Error("Erro ao Registrar usuario");
    delete signUpPayload.email
    delete signUpPayload.password

    const user = await this.authRepository.create(signUpPayload)
    const authData: AuthData = {
      accessToken: authenticated.accessToken,
      refreshToken: authenticated.refreshToken,
      expiresIn: authenticated.expiresIn,
      publicId: authenticated.publicId
    }
    return authData

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    };
  

  async SignIn(signInPayload: SignInPayload): Promise<AuthData> {
    try {

      console.log('sign')
      const authenticated = await this.authProvider.login(signInPayload.email, signInPayload.password);
      if(authenticated.condition == ECondition.ERROR) throw new Error("Erro ao Logar usuario");

      // const user = await this.usersRepository.findOne(authenticated.userId)
      return {
        accessToken: authenticated.accessToken,
        refreshToken: authenticated.refreshToken,
        expiresIn: authenticated.expiresIn,
        publicId: authenticated.publicId
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Authentication failed");
    }
  }
}
