import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import type { TenantRegisterationFormParams } from '../schemas/tenant-register-params.schema';
import { registerTenantResponseSchema } from '../schemas/tenant-register-response.schema';

export const registerFormTenantApi = async (
  data: TenantRegisterationFormParams,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'avatar') {
      if (value instanceof File) {
        formData.append(key, value);
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/tenant/register`,
    method: 'POST',
    body: formData,
    schema: registerTenantResponseSchema,
  });
};
