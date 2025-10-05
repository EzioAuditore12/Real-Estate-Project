import axios from 'axios';
import { env } from '@/env';
import type { user, tokens, role, userProperties } from '../../../-types';

export type registerFormTenantProps = {
  name: string;
  email: string;
  password: string;
};

export type registerFormTenantResponse = {
  success: boolean;
  message: string;
  user: user & userProperties;
  tokens: tokens;
  role: role;
};

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/tenant/register`;

export const registerFormTenantApi = async (data: registerFormTenantProps) => {
  const response = await axios.post<registerFormTenantResponse>(url, data);
  return response.data;
};
