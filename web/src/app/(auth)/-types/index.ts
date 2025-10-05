export type user = {
  id: string;
  email: string;
  name: string;
};

export type tokens = {
  accessToken: string;
  refreshToken: string;
};

export type role = 'TENANT' | 'MANAGER';
