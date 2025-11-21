import { z } from 'zod';

export const stateSchema = z.object({
  name: z.string(),

  state_code: z.string(),
});
