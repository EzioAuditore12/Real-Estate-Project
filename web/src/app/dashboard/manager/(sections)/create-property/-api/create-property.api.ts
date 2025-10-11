import authenticatedAxiosInstance from '@/lib/auth';

import { type PropertyParams } from '../-schemas/property-param.schema';
import { PropertyResponseSchema, type PropertyResponse } from '../-schemas/property-response.schema';

const url = "/property"

export const createPropertyFormApi = async(data: PropertyParams) => {

  const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => {
          if (Array.isArray(val)) {
            val.forEach((item) => formData.append(key, typeof item === "boolean" ? String(item) : item));
          } else {
            formData.append(key, typeof val === "boolean" ? String(val) : val);
          }
        });

  const response = await authenticatedAxiosInstance.post<PropertyResponse>(url, formData);

  const result = PropertyResponseSchema.safeParse(response.data);

  return result.data;
}