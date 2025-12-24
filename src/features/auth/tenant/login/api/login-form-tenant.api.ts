import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import type { LoginTenantFormParams } from '../schemas/login-tenant-params.schema';
import { loginTenantResponseSchema } from '../schemas/login-tenant-resposne.schema';

export const loginFormTenantApi = async (data: LoginTenantFormParams) => {
  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/tenant/login`,
    method: 'POST',
    body: data,
    schema: loginTenantResponseSchema,
  });
};
