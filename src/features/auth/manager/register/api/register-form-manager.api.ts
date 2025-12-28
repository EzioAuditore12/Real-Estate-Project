import { env } from '@/env';

import { typedFetch } from '@/lib/fetch';

import { registerManagerResponseSchema } from '../schemas/register-manager-response.schema';
import type { ManagerRegisterationFormParams } from '../schemas/register-manager-params.schema';

export const registerFormManagerApi = async (
  data: ManagerRegisterationFormParams,
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
    url: `${env.VITE_PUBLIC_SERVER_URL}/auth/manager/register`,
    method: 'POST',
    body: formData,
    schema: registerManagerResponseSchema,
  });
};
