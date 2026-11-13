import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'metabee_access_token';

export async function saveToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // almacenamiento no disponible: la sesión durará solo mientras la pestaña esté abierta
    }
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removeToken(): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // nada que borrar
    }
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}