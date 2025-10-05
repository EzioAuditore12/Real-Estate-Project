import axios from 'axios';
import { env } from '@/env';
import type {
  user,
  tokens,
  role,
  managerManagedProperties,
} from '../../../-types';

export type loginFormManagerProps = {
  email: string;
  password: string;
};

export type loginFormManagerResponse = {
  success: boolean;
  message: string;
  user: user & managerManagedProperties;
  tokens: tokens;
  role: role;
};

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/manager/login`;

export const loginFormManagerApi = async (data: loginFormManagerProps) => {
  const response = await axios.post<loginFormManagerResponse>(url, data);
  return response.data;
};
