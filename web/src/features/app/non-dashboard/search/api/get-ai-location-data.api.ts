import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import type { AiLocationDataParam } from '../schemas/ai-location-data/param.schema';
import { aiLocationDataResponseSchema } from '../schemas/ai-location-data/response.schema';

export const getAiLocationDataApi = async (data: AiLocationDataParam) => {
  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/ai/structured`,
    method: 'POST',
    body: data,
    schema: aiLocationDataResponseSchema,
  });
};
