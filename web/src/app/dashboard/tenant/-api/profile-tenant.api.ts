import type { user, userProperties } from '@/app/(auth)/-types';
import authenticatedAxiosInstance from '@/lib/auth';

type mangerProfileServiceResponse = {
  success: boolean;
  message: string;
} & user &
  userProperties;

const url = '/tenant';

export const tenantProfileApi = async () => {
  const response =
    await authenticatedAxiosInstance.get<mangerProfileServiceResponse>(url);
  return response.data;
};
