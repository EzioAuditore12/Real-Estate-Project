import authenticatedAxiosInstance from '@/lib/auth';

type mangerProfileServiceResponse = {
  success: boolean;
  message: string;
  data: string;
};

const url = '/manager';

export const managerProfileApi = async () => {
  const response =
    await authenticatedAxiosInstance.get<mangerProfileServiceResponse>(url);
  return response.data;
};
