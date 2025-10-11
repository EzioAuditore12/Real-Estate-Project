import axios from 'axios';
import { env } from '@/env';

import type { ManagerRegisterationFormParams } from '../../manager/-schemas/register-manager-params.schema';
import { registerTenantResponseSchema,type RegisterManagerResponse } from '../-schemas/tenant-register-response.schema';

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/tenant/register`;

export const registerFormTenantApi = async (data: ManagerRegisterationFormParams) => {

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

  const response = await axios.post<RegisterManagerResponse>(url,formData);

  const parsed =registerTenantResponseSchema.safeParse(response.data);
    if (!parsed.success) {
      throw new Error('Invalid response from server');
    }
    return parsed.data;
};
