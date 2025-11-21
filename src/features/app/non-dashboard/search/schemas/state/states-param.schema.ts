import { z } from 'zod';

export const statesParamSchema = z.object({
  country: z.string().default('India'),
});

export type StatesParam = z.infer<typeof statesParamSchema>;
