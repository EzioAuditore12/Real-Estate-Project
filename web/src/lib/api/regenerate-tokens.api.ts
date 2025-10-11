import { env } from '@/env';
import type { role } from '@/app/(auth)/-types';
import axios from 'axios';

const tokenRefreshAxios = axios.create({
  baseURL: env.VITE_PUBLIC_SERVER_URL,
});

type regenerateTokenApiParams = {
  oldRefreshToken: string;
  role: role;
};

type regenerateTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const managerUrl = `/auth/manager/refresh`;
const tenantUrl = `/auth/tenant/refresh`;

export const regenerateTokensApi = async (data: regenerateTokenApiParams) => {
  const url = data.role === 'MANAGER' ? managerUrl : tenantUrl;

  const response = await tokenRefreshAxios.post<regenerateTokenResponse>(url, {
    refreshToken: data.oldRefreshToken,
  });
  console.log(response);
  return response.data;
};
