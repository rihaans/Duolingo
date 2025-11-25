import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { progressService } from '../services/progressService';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface ProgressState {
  totalXP: number;
  weeklyXP: number;
  todayXP: number;
  level: number;
  currentStreak: number;
  hearts: number;
  dailyGoal: number;
  dailyGoalProgress: number;
  achievements: string[];
  loading: boolean;
}

interface ProgressContextType extends ProgressState {
  updateXP: (xp: number) => Promise<void>;
  updateHearts: (hearts: number) => Promise<void>;
  updateDailyGoal: (goal: number) => Promise<void>;
  refillHearts: () => Promise<void>;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const { user } = useAuth();

  const [progress, setProgress] = useState<ProgressState>({
    totalXP: 0,
    weeklyXP: 0,
    todayXP: 0,
    level: 1,
    currentStreak: 0,
    hearts: 5,
    dailyGoal: 100,
    dailyGoalProgress: 0,
    achievements: [],
    loading: true,
  });

  // Fetch progress when user logs in
  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      // Reset progress when user logs out
      setProgress({
        totalXP: 0,
        weeklyXP: 0,
        todayXP: 0,
        level: 1,
        currentStreak: 0,
        hearts: 5,
        dailyGoal: 100,
        dailyGoalProgress: 0,
        achievements: [],
        loading: false,
      });
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      setProgress(prev => ({ ...prev, loading: true }));
      const data = await progressService.getUserProgress();

      setProgress({
        totalXP: data.totalXP || 0,
        weeklyXP: data.weeklyXP || 0,
        todayXP: data.todayXP || 0,
        level: data.level || 1,
        currentStreak: data.currentStreak || 0,
        hearts: data.hearts !== undefined ? data.hearts : 5,
        dailyGoal: data.dailyGoal || 100,
        dailyGoalProgress: ((data.todayXP || 0) / (data.dailyGoal || 100)) * 100,
        achievements: data.achievements || [],
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
      setProgress(prev => ({ ...prev, loading: false }));
    }
  };

  const updateXP = async (xp: number) => {
    if (!user) return;

    try {
      const response = await progressService.updateXP(xp);

      setProgress(prev => ({
        ...prev,
        totalXP: response.totalXP,
        weeklyXP: response.weeklyXP,
        todayXP: response.todayXP,
        level: response.level,
        dailyGoalProgress: (response.todayXP / prev.dailyGoal) * 100,
      }));

      // Show level up toast if leveled up
      if (response.leveledUp) {
        toast.success(`Level Up! You're now level ${response.level}!`, {
          icon: '🎉',
          duration: 5000,
        });
      }

      // Show daily goal complete toast if just completed
      if (response.todayXP >= progress.dailyGoal &&
          response.todayXP - xp < progress.dailyGoal) {
        toast.success('Daily goal complete! 🎯', {
          icon: '✅',
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Error updating XP:', error);
      toast.error('Failed to update XP');
    }
  };

  const updateHearts = async (hearts: number) => {
    if (!user) return;

    try {
      await progressService.updateHearts(hearts);
      setProgress(prev => ({ ...prev, hearts }));
    } catch (error) {
      console.error('Error updating hearts:', error);
    }
  };

  const updateDailyGoal = async (goal: number) => {
    if (!user) return;

    try {
      await progressService.updateDailyGoal(goal);
      setProgress(prev => ({
        ...prev,
        dailyGoal: goal,
        dailyGoalProgress: (prev.todayXP / goal) * 100,
      }));
      toast.success('Daily goal updated!');
    } catch (error) {
      console.error('Error updating daily goal:', error);
      toast.error('Failed to update daily goal');
    }
  };

  const refillHearts = async () => {
    if (!user) return;

    try {
      const response = await progressService.refillHearts();
      setProgress(prev => ({ ...prev, hearts: response.hearts }));
      toast.success('Hearts refilled! ❤️');
    } catch (error) {
      console.error('Error refilling hearts:', error);
      toast.error('Failed to refill hearts');
    }
  };

  const refreshProgress = async () => {
    await fetchProgress();
  };

  const value: ProgressContextType = {
    ...progress,
    updateXP,
    updateHearts,
    updateDailyGoal,
    refillHearts,
    refreshProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
