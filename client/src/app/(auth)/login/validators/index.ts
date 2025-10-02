import { z } from "zod";

export const loginFormValidator = z.object({
  email: z.email().max(240),
  password: z.string().nonempty(),
  role: z.enum(["MANAGER", "TENANT"]),
});

export type loginInputs = z.infer<typeof loginFormValidator>;
