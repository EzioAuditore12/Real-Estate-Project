import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  client: {
    VITE_PUBLIC_SERVER_URL: z.string(),
    VITE_PUBLIC_NOMANTIM_USER_AGENT: z.string(),
  },
  clientPrefix: 'VITE_',
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});
