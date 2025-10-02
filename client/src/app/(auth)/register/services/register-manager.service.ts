import axios from "axios";
import { env } from "@/env";
import type { user, tokens, role } from "../../types";

export type registerManagerFormProps = {
  email: string;
  password: string;
};

export type registerManagerFormResponse = {
  success: boolean;
  message: string;
  user: user;
  tokens: tokens;
  role: role;
};

const url = `${env.API_BASE_URL}/auth/manager/register`;

export const registerFormManagerService = async (
  data: registerManagerFormProps,
) => {
  const response = await axios.post<registerManagerFormResponse>(url, data);
  return response;
};
