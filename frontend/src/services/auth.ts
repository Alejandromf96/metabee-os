import { ApiError, apiFetch } from './api';
import { getToken, removeToken, saveToken } from './tokenStorage';

export type User = {
  id: string;
  email: string;
  timezone: string;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
};

export function register(email: string, password: string): Promise<User> {
  return apiFetch<User>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string): Promise<void> {
  const data = await apiFetch<TokenResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  await saveToken(data.access_token);
}

export async function getMe(): Promise<User | null> {
  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    return await apiFetch<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      await removeToken();
      return null;
    }
    throw error;
  }
}

export async function logout(): Promise<void> {
  await removeToken();
}