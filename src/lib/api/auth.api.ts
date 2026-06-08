import apiClient from './client';
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth.types';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/login', payload);
  return data;
};

export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await apiClient.post('/auth/register', payload);
  return data;
};