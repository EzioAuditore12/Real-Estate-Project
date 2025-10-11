import axios from 'axios';
import { env } from '@/env';
import { registerManagerResponseSchema } from '../-schemas/register-manager-response.schema';
import type { ManagerRegisterationFormParams } from '../-schemas/register-manager-params.schema';

const url = `${env.VITE_PUBLIC_SERVER_URL}/auth/manager/register`;

export const registerFormManagerApi = async (
  data: ManagerRegisterationFormParams,
) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'avatar') {
      if (value instanceof File) {
        formData.append(key, value);
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  });

  const response = await axios.post<ManagerRegisterationFormParams>(url, formData);

  const parsed = registerManagerResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    throw new Error('Invalid response from server');
  }
  return parsed.data;
};
