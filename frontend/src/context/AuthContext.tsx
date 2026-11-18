import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import * as authService from '../services/auth';
import type { User } from '../services/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function signIn(email: string, password: string) {
    await authService.login(email, password);
    setUser(await authService.getMe());
  }

  async function signUp(email: string, password: string) {
    await authService.register(email, password);
    await signIn(email, password);
  }

  async function signOut() {
    await authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}