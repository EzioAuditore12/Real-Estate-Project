import {z} from "zod";
import { isJWT } from "validator";

export const tokenSchema = z.object({
        accessToken: z.string().refine((val)=> isJWT(val) , {
            error: "Not recieved a jwt signature"
        }),
        refreshToken: z.string().refine((val)=> isJWT(val),{
            error: "Not recieved a jwt signature"
        }),
})

export type Tokens = z.infer<typeof tokenSchema>