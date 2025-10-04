import type { user, role, tokens } from "@/app/(auth)/-types";

export interface AuthStore {
  user: user | null;
  tokens: tokens | null;
  role: role | null;
  setCredentials(data: { user: user; tokens: tokens; role: role }): void;
  verifySession(): boolean;
  logout: () => void;
}
