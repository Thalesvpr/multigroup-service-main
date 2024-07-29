import {  AutorizationResult } from "../../../shared/interfaces/resultResponse.interface";
import { AuthData, SignUpPayload } from "../../../proto/generated/proto/auth";
import { SignInPayload } from '../../../proto/generated/proto/auth';



export interface IAuthService {
  SignUp(signUpPayload: SignUpPayload): Promise<AuthData>
  SignIn(signInPayload: SignInPayload): Promise<AuthData>
}




export interface IAuthProvider {
  register(email: string, password: string): Promise<AutorizationResult>
  login(email: string, password: string): Promise<AutorizationResult>
}
