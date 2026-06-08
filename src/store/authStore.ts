import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      // Called after successful login/register
      setAuth: (user, token) => set({ user, token }),

      // Clear everything on logout
      logout: () => set({ user: null, token: null }),

      // Merge partial update (used after profile save)
      updateUser: (partial) =>
        set({ user: get().user ? { ...get().user!, ...partial } : null }),
    }),
    {
      name: 'foody-auth',             // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);