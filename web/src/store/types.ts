import type { user, role, tokens } from '@/app/(auth)/-types';

export interface AuthStore {
  user: user | null;
  tokens: tokens | null;
  role: role | null;
  setUserDetails(data: user): void;
  setUserTokens(data: tokens): void;
  setUserRole(data: role): void;
  verifySession(): boolean;
  logout: () => void;
}
