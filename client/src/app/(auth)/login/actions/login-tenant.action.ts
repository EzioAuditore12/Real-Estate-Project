"use server";

import { redirect } from "next/navigation";
import {
  loginFormProps,
  loginFormTenantService,
} from "../services/login-form-tenant.service";
import { createSession } from "@/lib/session";

export async function loginTenant(data: loginFormProps) {
  try {
    const response = await loginFormTenantService(data);

    await createSession({
      user: response.data.user,
      tokens: response.data.tokens,
      role: response.data.role,
    });
  } catch (error) {
    console.log(error);
    return;
  }

  redirect("/");
}
