"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";

import type { user, tokens, role } from "@/app/(auth)/types";

type SessionObject = {
  user: user;
  tokens: tokens;
  role: role;
};

const secretKey = "dubPHlwkRBjuRbbWHW2NboKSQ9bAgcrCSPFnIufDqak=";
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: SessionObject) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function getSession() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get("session")?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as SessionObject;
  } catch (err) {
    console.error("Failed to verify the session", err);
    redirect("/login");
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<SessionObject>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: SessionObject = {
    user: {
      ...payload.user,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
    role: payload.role,
  };

  await createSession(newPayload);
}
