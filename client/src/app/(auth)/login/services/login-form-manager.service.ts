import axios from "axios";
import { env } from "@/env";
import type { user, tokens, role } from "../../types";

export type loginFormProps = {
  email: string;
  password: string;
};

export type loginFormResponse = {
  success: boolean;
  message: string;
  user: user;
  tokens: tokens;
  role: role;
};

const url = `${env.API_BASE_URL}/auth/manager/login`;

export const loginFormManagerService = async (data: loginFormProps) => {
  const response = await axios.post<loginFormResponse>(url, data);
  return response;
};
