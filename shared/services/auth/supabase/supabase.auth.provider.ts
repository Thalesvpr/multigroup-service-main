import { Injectable } from '@nestjs/common';
import { SupabaseClient, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { IAuthProvider } from 'apps/auth/src/auth.interface';
import { AutorizationResult, ECondition } from 'shared/interfaces/resultResponse.interface';


@Injectable()
export class SupabaseAuthProvider implements IAuthProvider {

  public supabase: SupabaseClient;
  private supabaseUrl: string = process.env.PUBLIC_SUPABASE_URL
  private supabaseKey: string = process.env.PUBLIC_SUPABASE_ANON_KEY
  constructor(
  ) {
    console.log([this.supabaseUrl, this.supabaseKey])
    this.supabase = new SupabaseClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        persistSession: true,
      },
    });
  }

  async register(email: string, password: string): Promise<AutorizationResult> {
    try {
      const credentials ={
        email: email,
        password: password,
      }
      const { data, error } = await this.supabase.auth.signUp(credentials);
      if (error) {
        // throw new Error(error.message);
      }

      console.log(data)
      console.log('-----------------------------------')
      console.log(error)
      

      const autorization: AutorizationResult = {
        publicId: data.user.id,
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresIn: data.session.expires_in,
        condition: ECondition.SUCCESS
      }
      return autorization
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string): Promise<AutorizationResult> {
    const signInCredencials: SignInWithPasswordCredentials = {
      email,
      password,
    }
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword(signInCredencials);

      if (error) {
        throw new Error(error.message);
      }

      const autorization: AutorizationResult = {
        publicId: data.user.id,
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresIn: data.session.expires_in,
        condition: ECondition.SUCCESS
      }
      return autorization
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.supabase.auth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
