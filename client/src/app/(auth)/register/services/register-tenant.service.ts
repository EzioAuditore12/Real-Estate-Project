import axios from "axios";
import { env } from "@/env";
import type { user, tokens, role } from "../../types";

export type registerTenantFormProps = {
  email: string;
  password: string;
};

export type registerTenantFormResponse = {
  success: boolean;
  message: string;
  user: user;
  tokens: tokens;
  role: role;
};

const url = `${env.API_BASE_URL}/auth/manager/register`;

export const registerFormTenantService = async (
  data: registerTenantFormProps,
) => {
  const response = await axios.post<registerTenantFormResponse>(url, data);
  return response;
};
