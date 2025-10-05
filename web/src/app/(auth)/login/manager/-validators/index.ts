import { z } from 'zod';

export const managerLoginFormValidator = z.object({
  email: z.email().max(240),
  password: z.string().nonempty(),
});

export type managerLoginInputs = z.infer<typeof managerLoginFormValidator>;
