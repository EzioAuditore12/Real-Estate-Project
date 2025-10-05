import type { tenantProperties, user } from '@/app/(auth)/-types';
import authenticatedAxiosInstance from '@/lib/auth';

type mangerProfileServiceResponse = {
  success: boolean;
  message: string;
} & user &
  tenantProperties;

const url = '/tenant';

export const tenantProfileApi = async () => {
  const response =
    await authenticatedAxiosInstance.get<mangerProfileServiceResponse>(url);
  return response.data;
};
