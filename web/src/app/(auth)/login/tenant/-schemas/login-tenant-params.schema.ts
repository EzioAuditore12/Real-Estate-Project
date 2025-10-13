import { z } from 'zod';

export const loginTenantFormParamsSchema = z.object({
  email: z.email().max(240),
  password: z.string().nonempty(),
});

export type LoginTenantFormParams = z.infer<typeof loginTenantFormParamsSchema>;
