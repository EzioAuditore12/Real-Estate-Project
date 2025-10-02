import type { ReactNode } from "react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/landing");
  return <>{children}</>;
}
