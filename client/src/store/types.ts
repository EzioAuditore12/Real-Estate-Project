import type { user, role, tokens } from "@/app/(auth)/types";

export interface AuthStore {
  user: user | null;
  tokens: tokens | null;
  role: role | null;
  setUserDetails: (data: user) => void;
  setUserToken: (data: tokens) => void;
  setRole: (data: role) => void;
  logout: () => void;
}
