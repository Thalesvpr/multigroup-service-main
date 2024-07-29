import { z } from "zod";

export const RegisterPayloadSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),//TODO:
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    formService: z.string(),
})