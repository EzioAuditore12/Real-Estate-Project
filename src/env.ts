import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  client: {
    VITE_PUBLIC_SERVER_URL: z.url(),
    VITE_PUBLIC_NOMANTIM_USER_AGENT: z.email(),
    VITE_PUBLIC_GRAPHQL_SERVER: z.url(),
    VITE_PUBLIC_MAPBOX_API_TOKEN: z.string(),
  },
  clientPrefix: 'VITE_',
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
