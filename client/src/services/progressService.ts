import api from './api';
import { ApiResponse, Progress, Achievement, LeaderboardEntry } from '../types';

export const progressService = {
  async getProgress(): Promise<any> {
    const response = await api.get<ApiResponse<any>>('/progress');
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to get progress');
  },

  async getUserProgress(): Promise<any> {
    const response = await api.get<ApiResponse<any>>('/progress');
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to get user progress');
  },

  async updateXP(xp: number): Promise<{
    totalXP: number;
    weeklyXP: number;
    todayXP: number;
    level: number;
    leveledUp: boolean;
  }> {
    const response = await api.post<ApiResponse<{
      totalXP: number;
      weeklyXP: number;
      todayXP: number;
      level: number;
      leveledUp: boolean;
    }>>('/progress/update-xp', { xp });
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to update XP');
  },

  async updateHearts(hearts: number): Promise<{ hearts: number }> {
    const response = await api.post<ApiResponse<{ hearts: number }>>(
      '/progress/update-hearts',
      { hearts }
    );
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to update hearts');
  },

  async updateDailyGoal(dailyGoal: number): Promise<{ dailyGoal: number }> {
    const response = await api.put<ApiResponse<{ dailyGoal: number }>>(
      '/daily-goal',
      { dailyGoal }
    );
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to update daily goal');
  },

  async refillHearts(): Promise<{ hearts: number }> {
    const response = await api.post<ApiResponse<{ hearts: number }>>(
      '/hearts/refill'
    );
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to refill hearts');
  },

  async getAchievements(): Promise<{
    achievements: Achievement[];
    unlocked: number;
    total: number;
  }> {
    const response = await api.get<
      ApiResponse<{
        achievements: Achievement[];
        unlocked: number;
        total: number;
      }>
    >('/achievements');
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to get achievements');
  },

  async getLeaderboard(
    type: 'weekly' | 'all-time' = 'weekly'
  ): Promise<{ leaderboard: LeaderboardEntry[]; userRank: number | null }> {
    const response = await api.get<
      ApiResponse<{ leaderboard: LeaderboardEntry[]; userRank: number | null }>
    >(`/leaderboard?type=${type}`);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed to get leaderboard');
  },
};
