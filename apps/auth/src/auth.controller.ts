import { Controller, ExecutionContext, ValidationError } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthServiceImpl } from './auth.service';
import { AuthData, AuthResponse, AuthService, HealthStatus, SignInPayload, SignUpPayload } from 'proto/generated/proto/auth';
import { FieldError } from 'proto/generated/proto/shared';
import { FieldValidationError } from 'shared/validation/validation.interface';

@Controller()
export class AuthController implements AuthService{
  constructor(private readonly authService: AuthServiceImpl) { }
  callback: (input: string) => number

  
  @GrpcMethod('AuthService')
  async SignIn(request: SignInPayload): Promise<AuthResponse> {
    return await this._autenticateUser(()=> this.authService.SignIn(request))
  }
  
  
  @GrpcMethod('AuthService')
  async CheckHealth(): Promise<HealthStatus> {
    return await this.authService.CheckHealth()
  }
  
  @GrpcMethod('AuthService')
  async SignUp(request: SignUpPayload): Promise<AuthResponse> { // AuthResponse do proto
    
    return await this._autenticateUser(()=> this.authService.SignUp(request))
    
    
  }
  async _autenticateUser(  authServiceMethod: () => Promise<AuthData>){
    try {

      const autorized = await authServiceMethod();
  
        const result: AuthResponse = {
          data: autorized
          
        }
        console.log(result)
        return result;
  
    } catch (error) {
      console.error(error)
      if (error instanceof FieldValidationError) {
        const result: AuthResponse = {
          error: {
            message: undefined ,
            fieldError:  error
          }
        }
        return result;
      }
      const result: AuthResponse = {
        error: {
          message: error.message
        },
      }
      return result;
    }
  }
  
}
