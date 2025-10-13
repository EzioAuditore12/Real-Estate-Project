import authenticatedAxiosInstance from '@/lib/auth';

import {
  managedPropertiesResponseSchema,
  type ManagedProeprtiesResponse,
} from '../-schemas/managed-propertties.response';

const url = '/property/created';

export const managedPropertyApi = async () => {
  const response =
    await authenticatedAxiosInstance.get<ManagedProeprtiesResponse>(url);

  console.log(response.data);

  const result = managedPropertiesResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error(result.error);
    throw Error('Unable to parse correctly');
  }

  return result.data;
};
