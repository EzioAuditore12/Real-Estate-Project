import type { User } from '@/app/(auth)/-schemas/user.schema';
import type { Tokens } from '@/app/(auth)/-schemas/tokens.schema';
import type { Role } from '@/app/(auth)/-schemas/role.schema';

export interface AuthStore {
  user: User | null;
  tokens: Tokens | null;
  role: Role | null;
  setUserDetails(data: User): void;
  setUserTokens(data: Tokens): void;
  setUserRole(data: Role): void;
  verifySession(): boolean;
  logout: () => void;
}
