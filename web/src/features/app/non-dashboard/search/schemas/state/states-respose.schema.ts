import { z } from 'zod';

import { stateSchema } from './state.schema';

export const statesResponseSchema = z.object({
  error: z.boolean(),

  msg: z.string(),

  data: z.object({
    name: z.string(),

    iso3: z.string(),

    iso2: z.string(),

    states: z.array(stateSchema),
  }),
});

export type StatesResponse = z.infer<typeof statesResponseSchema>;
