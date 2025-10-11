import {z} from "zod";

import { roleSchema } from "@/app/(auth)/-schemas/role.schema";
import { tokenSchema } from "@/app/(auth)/-schemas/tokens.schema";
import { userSchema } from "@/app/(auth)/-schemas/user.schema";

export const loginManagerResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    user: userSchema,
    tokens: tokenSchema,
    role: roleSchema 
})

export type LoginManagerResponse = z.infer<typeof loginManagerResponseSchema>