'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';          // npm install js-cookie @types/js-cookie
import * as authApi from '@/lib/api/auth.api';
import { useAuthStore } from '@/store/authStore';
import { getErrorMessage } from '@/lib/utils';
import type { LoginPayload, RegisterPayload } from '@/types/auth.types';

// ── Login ────────────────────────────────────────────────────
export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),

    onSuccess: (data) => {
      // 1. Update Zustand client state
      setAuth(data.user, data.token);

      // 2. Mirror token to cookie so middleware can read it
      Cookies.set('foody-token', data.token, {
        expires: 7,    // 7 days
        secure: true,
        sameSite: 'strict',
      });

      toast.success(`Welcome back, ${data.user.name}!`);
      router.push('/');
      router.refresh();            // Re-run Server Components with new auth state
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

// ── Register ─────────────────────────────────────────────────
export const useRegister = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),

    onSuccess: (data) => {
      setAuth(data.user, data.token);
      Cookies.set('foody-token', data.token, { expires: 7, secure: true });
      toast.success('Account created! Welcome to Foody.');
      router.push('/');
      router.refresh();
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};