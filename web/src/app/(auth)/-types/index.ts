export type user = {
  id: string;
  email: string;
  name: string;
};

export type tokens = {
  accessToken: string;
  refreshToken: string;
};

export type tenantProperties = {
  favourites: Array<string>;
  properties: Array<string>;
};

export type managerManagedProperties = {
  managedProperties: Array<string>;
};

export type role = 'TENANT' | 'MANAGER';
