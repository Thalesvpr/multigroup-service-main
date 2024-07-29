// import { Injectable } from "@nestjs/common";
// import { createClient, SupabaseClient } from "@supabase/supabase-js";


// @Injectable()

// class SupabaseService {
//     private supabase: SupabaseClient;
//     private supabaseUrl: string = process.env.PUBLIC_SUPABASE_URL
//     private supabaseKey: string = process.env.PUBLIC_SUPABASE_ANON_KEY

//     public constructor() {
//         this.supabase = new SupabaseClient(this.supabaseUrl, this.supabaseKey, {
//             auth: {
//               persistSession: true,
//             },
//           });
//     }

//     public getClient(): SupabaseClient{
//         return this.supabase;
//     }
// }

// export default SupabaseService ;
