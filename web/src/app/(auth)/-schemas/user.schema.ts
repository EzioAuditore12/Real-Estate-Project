import {z} from "zod";

export const userSchema = z.object({
        id: z.string(),
        name: z.string(),
        email: z.email(),
        avatar: z.url().nullable(),
})

export type User = z.infer<typeof userSchema>