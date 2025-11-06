import type { User } from '@/features/auth/-schemas/user.schema';
import type { Tokens } from '@/features/auth/-schemas/tokens.schema';
import type { Role } from '@/features/auth/-schemas/role.schema';

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
