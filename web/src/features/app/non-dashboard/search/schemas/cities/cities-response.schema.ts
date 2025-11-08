import { z } from 'zod';

export const cityResponseSchema = z.object({
  error: z.boolean(),

  msg: z.string(),

  data: z.array(z.string()),
});

export type CityResponse = z.infer<typeof cityResponseSchema>;
