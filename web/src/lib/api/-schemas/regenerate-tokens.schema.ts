import { z } from 'zod';
import { isJWT } from 'validator';

export const regenerateTokensResponseSchema = z.object({
  accessToken: z.string().refine((val) => isJWT(val)),
  refreshToken: z.string().refine((val) => isJWT(val)),
});

export type RegenerateTokensResponseSchema = z.infer<
  typeof regenerateTokensResponseSchema
>;
