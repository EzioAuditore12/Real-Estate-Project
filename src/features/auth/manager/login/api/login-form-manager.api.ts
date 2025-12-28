import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import type { ManagerLoginFormParams } from '../schemas/login-manager-params.schema';
import { loginManagerResponseSchema } from '../schemas/login-manager-resposne.schema';

export const loginFormManagerApi = async (data: ManagerLoginFormParams) => {
  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/manager/login`,
    method: 'POST',
    body: data,
    schema: loginManagerResponseSchema,
  });
};
