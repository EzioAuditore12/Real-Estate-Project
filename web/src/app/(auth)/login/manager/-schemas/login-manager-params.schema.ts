import { z } from 'zod';

export const managerLoginFormParamsSchema = z.object({
  email: z.email().max(240),
  password: z.string().nonempty(),
});

export type ManagerLoginFormParams = z.infer<typeof managerLoginFormParamsSchema>;
