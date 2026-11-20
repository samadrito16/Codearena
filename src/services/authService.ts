import { apiRequest } from '../lib/api';
import type { User } from '../types';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  email_verified: boolean;
  user?: User;
}

function extractUser(response: UserResponse): User {
  if (response.user) {
    return response.user;
  }
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    role: response.role,
    email_verified: response.email_verified,
  };
}

export const authService = {
  async register(input: { name: string; email: string; password: string }): Promise<User> {
    const response = await apiRequest<UserResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return extractUser(response);
  },

  async signIn(input: { email: string; password: string }): Promise<User> {
    const response = await apiRequest<UserResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return extractUser(response);
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiRequest<UserResponse>('/auth/me', {
      method: 'GET',
    });
    return extractUser(response);
  },

  async signOut(): Promise<void> {
    await apiRequest<void>('/auth/logout', {
      method: 'POST',
    });
  },

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    return await apiRequest<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(input: { token: string; password: string }): Promise<{ message: string }> {
    return await apiRequest<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async verifyEmail(token: string): Promise<{ message: string; user?: User }> {
    const res = await apiRequest<{ message: string; user?: UserResponse }>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    return {
      message: res.message,
      user: res.user ? extractUser(res.user) : undefined,
    };
  },

  async resendVerification(email?: string): Promise<{ message: string }> {
    return await apiRequest<{ message: string }>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};
