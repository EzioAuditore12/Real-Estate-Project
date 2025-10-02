"use server";

import { redirect } from "next/navigation";
import {
  type registerTenantFormProps,
  registerFormTenantService,
} from "../services/register-tenant.service";
import { createSession } from "@/lib/session";

export async function registerTenant(data: registerTenantFormProps) {
  try {
    const response = await registerFormTenantService(data);

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
