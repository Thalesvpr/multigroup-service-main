import { BaseRepository } from "shared/repository/base/base.repository.abstract";
import { SupabaseClient, UserAttributes, UserResponse } from '@supabase/supabase-js';
import { IBaseRepository } from "shared/repository/base/base.repository.interface";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { Inject, Injectable } from "@nestjs/common";
import { users } from "@prisma/client";
import { UserPayload } from "apps/user/proto/user";
import { SignUpPayload } from "proto/generated/proto/auth";
import { SupabaseAuthProvider } from "shared/services/auth/supabase/supabase.auth.provider";



@Injectable()

export class AuthRepository implements IBaseRepository<any> {
    
    private readonly supabaseClient: SupabaseClient;
    
    public constructor(supabaseService: SupabaseAuthProvider) {
        this.supabaseClient = supabaseService.supabase
    }
    create(item: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: number | string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number | string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    async update(id: number | string, item: Partial<SignUpPayload>): Promise<any> {

        const { data, error } = await this.supabaseClient
            .from('auth.users')
            .update({
                email: item.email,
                phone: item.phoneNumber,
            })
            .match({ id: id });

        if (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }

        return data;
    }

}

