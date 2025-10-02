"use server";

import { redirect } from "next/navigation";
import {
  loginFormProps,
  loginFormManagerService,
} from "../services/login-form-manager.service";
import { createSession } from "@/lib/session";

export async function loginManager(data: loginFormProps) {
  try {
    const response = await loginFormManagerService(data);

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
