import { z } from 'zod';

export const CitiesParamSchema = z.object({
  country: z.string().nonempty().default('India'),

  state: z.string().nonempty(),
});

export type CitiesParam = z.infer<typeof CitiesParamSchema>;
