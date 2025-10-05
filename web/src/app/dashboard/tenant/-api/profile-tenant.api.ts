import authenticatedAxiosInstance from '@/lib/auth';

type mangerProfileServiceResponse = {
  success: boolean;
  message: string;
  data: string;
};

const url = '/tenant';

export const tenantProfileApi = async () => {
  const response =
    await authenticatedAxiosInstance.get<mangerProfileServiceResponse>(url);
  return response.data;
};
