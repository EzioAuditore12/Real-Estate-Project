import axios from 'axios';
import { env } from '@/env';
import type { user, tokens, role } from '../../../-types';

export type registerFormManagerProps = {
  name: string;
  email: string;
  password: string;
};

export type registerFormManagerResponse = {
  success: boolean;
  message: string;
  user: user;
  tokens: tokens;
  role: role;
};

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/manager/register`;

export const registerFormManagerApi = async (
  data: registerFormManagerProps,
) => {
  const response = await axios.post<registerFormManagerResponse>(url, data);
  return response.data;
};
