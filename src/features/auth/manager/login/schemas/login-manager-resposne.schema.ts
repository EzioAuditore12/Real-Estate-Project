import { z } from 'zod';

import { roleSchema } from '@/features/auth/-schemas/role.schema';
import { tokenSchema } from '@/features/auth/-schemas/tokens.schema';
import { userSchema } from '@/features/auth/-schemas/user.schema';

export const loginManagerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  user: userSchema,
  tokens: tokenSchema,
  role: roleSchema,
});

export type LoginManagerResponse = z.infer<typeof loginManagerResponseSchema>;
