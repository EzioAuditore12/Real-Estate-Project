import {z} from "zod";
import { isStrongPassword } from "validator";
import { imageSchema } from "@/lib/schemas";

export const tenantRegisterationFormParamSchema = z.object({
  name: z.string().nonempty().max(50),
  email: z.email().max(240),
  avatar: imageSchema.optional(),
  password: z
    .string()
    .max(16)
    .refine(
      (val) =>
        isStrongPassword(val, {
          minLength: 8,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
        }),
      {
        error: 'The password should be atleast in range of 8 to 16 and should contain atleast one uppercase,lowercase,symbol and number',
      },
    ),
});

export type TenantRegisterationFormParams = z.input<typeof tenantRegisterationFormParamSchema>