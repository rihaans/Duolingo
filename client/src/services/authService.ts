import api from './api';
import { User, ApiResponse } from '../types';

export interface SignupData {
  username: string;
  email: string;
  password: string;
  age?: number;
  learningGoal?: string;
  dailyGoal?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/signup',
      data
    );
    if (response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      return response.data.data;
    }
    throw new Error('Signup failed');
  },

  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>(
      '/auth/login',
      data
    );
    if (response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      return response.data.data;
    }
    throw new Error('Login failed');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    if (response.data.data) {
      return response.data.data.user;
    }
    throw new Error('Failed to get user');
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<{ user: User }>>('/auth/profile', data);
    if (response.data.data) {
      return response.data.data.user;
    }
    throw new Error('Failed to update profile');
  },

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};
