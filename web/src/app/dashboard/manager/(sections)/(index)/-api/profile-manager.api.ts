import type { managerManagedProperties, user } from '@/app/(auth)/-types';
import authenticatedAxiosInstance from '@/lib/auth';

type mangerProfileServiceResponse = {
  success: boolean;
  message: string;
} & user &
  managerManagedProperties;

const url = '/manager';

export const managerProfileApi = async () => {
  const response =
    await authenticatedAxiosInstance.get<mangerProfileServiceResponse>(url);
  return response.data;
};
