import { z } from 'zod';

export const aiLocationDataParamSchema = z.object({
  prompt: z.string(),
});

export type AiLocationDataParam = z.infer<typeof aiLocationDataParamSchema>;
