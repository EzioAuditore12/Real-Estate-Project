"use server";

import { redirect } from "next/navigation";
import {
  type registerManagerFormProps,
  registerFormManagerService,
} from "../services/register-manager.service";
import { createSession } from "@/lib/session";

export async function registerManager(data: registerManagerFormProps) {
  try {
    const response = await registerFormManagerService(data);

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
