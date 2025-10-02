"use server";

import { env } from "@/env";

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${env.API_BASE_URL}/auth/tenant/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token" + response.statusText);
    }

    const { accessToken, refreshToken } =
      (await response.json()) as unknown as {
        accessToken: string;
        refreshToken: string;
      };
    // update session with new tokens
    const updateRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });
    if (!updateRes.ok) throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};
