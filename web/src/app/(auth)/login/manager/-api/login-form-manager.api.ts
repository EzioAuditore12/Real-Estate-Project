import axios from 'axios';
import { env } from '@/env';

import type { ManagerLoginFormParams } from '../-schemas/login-manager-params.schema';
import {
  loginManagerResponseSchema,
  type LoginManagerResponse,
} from '../-schemas/login-manager-resposne.schema';

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/manager/login`;

export const loginFormManagerApi = async (data: ManagerLoginFormParams) => {
  const response = await axios.post<LoginManagerResponse>(url, data);

  const parsed = loginManagerResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error('Invalid response from server');
  }

  return parsed.data;
};
