import { env } from '@/env';
import type { Role } from '@/features/auth/-schemas/role.schema';

import { typedFetch } from '../fetch';

import { regenerateTokensResponseSchema } from './-schemas/regenerate-tokens.schema';

type regenerateTokenApiParams = {
  oldRefreshToken: string;
  role: Role;
};

const managerUrl = `auth/manager/refresh`;
const tenantUrl = `auth/tenant/refresh`;

export const regenerateTokensApi = async (data: regenerateTokenApiParams) => {
  const url = data.role === 'MANAGER' ? managerUrl : tenantUrl;

  return await typedFetch({
    url: `${env.VITE_PUBLIC_SERVER_URL}/${url}`,
    method: 'POST',
    body: { refreshToken: data.oldRefreshToken },
    schema: regenerateTokensResponseSchema,
  });
};
