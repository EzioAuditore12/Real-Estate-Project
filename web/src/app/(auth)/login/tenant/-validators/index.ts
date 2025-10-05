import { z } from 'zod';

export const tenantLoginFormValidator = z.object({
  email: z.email().max(240),
  password: z.string().nonempty(),
});

export type tenantLoginInputs = z.infer<typeof tenantLoginFormValidator>;
