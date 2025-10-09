import {z} from "zod";

export const categoriesSchema = z.enum(["clothing","books","toys","electronics"])

export const filterSchema = z.object({
    query: z.string(),
    hasDiscount: z.boolean(),

}).partial()