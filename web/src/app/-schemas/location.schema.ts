import z from 'zod';

export const locationSchema = z.object({
  id: z.uuid(),

  address: z.string(),

  city: z.string(),

  state: z.string(),

  country: z.string(),

  postalCode: z.string(),

  longitude: z.number(),

  latitude: z.number(),
});

export type LocationSchema = z.infer<typeof locationSchema>;
