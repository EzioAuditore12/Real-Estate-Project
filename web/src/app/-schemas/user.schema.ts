import {z} from 'zod';

export const userSchema = z.object({

    id: z.uuid(),

    name: z.string(),

    email: z.email(),

    avatar: z.url().nullable(),

    createdAt: z.iso.datetime(),
})

export type User = z.infer<typeof userSchema>