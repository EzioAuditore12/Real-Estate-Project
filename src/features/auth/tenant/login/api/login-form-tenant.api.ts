import axios from 'axios';
import { env } from '@/env';

import type { LoginTenantFormParams } from '../schemas/login-tenant-params.schema';
import {
  loginTenantResponseSchema,
  type LoginTenantResponse,
} from '../schemas/login-tenant-resposne.schema';

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/tenant/login`;

export const loginFormTenantApi = async (data: LoginTenantFormParams) => {
  const response = await axios.post<LoginTenantResponse>(url, data);

  const parsed = loginTenantResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error('Invalid response from server');
  }

  return parsed.data;
};
