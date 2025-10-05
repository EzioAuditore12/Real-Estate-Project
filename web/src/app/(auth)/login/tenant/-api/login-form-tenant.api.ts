import axios from 'axios';
import { env } from '@/env';
import type { user, tokens, role, userProperties } from '../../../-types';

export type loginFormTenantProps = {
  email: string;
  password: string;
};

export type loginFormTenantResponse = {
  success: boolean;
  message: string;
  user: user & userProperties;
  tokens: tokens;
  role: role;
};

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/tenant/login`;

export const loginFormTenantApi = async (data: loginFormTenantProps) => {
  const response = await axios.post<loginFormTenantResponse>(url, data);
  return response.data;
};
