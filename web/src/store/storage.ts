import type { StateStorage } from 'zustand/middleware';

// Cookie utility functions
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }

  return null;
};

const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
};

const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
};

export const cookieStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return getCookie(name);
  },

  setItem: (name: string, value: string): void => {
    setCookie(name, value, 7); // Store for 7 days
  },

  removeItem: (name: string): void => {
    deleteCookie(name);
  },
};
