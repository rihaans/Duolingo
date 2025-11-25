// User Types
export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  learningLanguage: string;
  totalXP: number;
  weeklyXP: number;
  todayXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  hearts: number;
  dailyGoal: number;
  achievements: string[];
}

// Course Types
export type QuestionType =
  | 'translation'
  | 'multiple-choice-text'
  | 'multiple-choice-image'
  | 'listen-and-type'
  | 'fill-in-blank'
  | 'sentence-builder'
  | 'match-pairs';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  correctAnswer: string | string[];
  options?: string[];
  wordBank?: string[];
  pairs?: { left: string; right: string }[];
  imageOptions?: { image: string; label: string }[];
  audioUrl?: string;
  hint?: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  skillId: string;
  title: string;
  order: number;
  questions: Question[];
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  unitId: string;
  lessons: Lesson[];
  isUnlocked?: boolean;
  userLevel?: number;
  lessonsCompleted?: string[];
}

export interface Unit {
  id: string;
  title: string;
  order: number;
  skills: Skill[];
}

export interface Course {
  id: string;
  language: string;
  title: string;
  units: Unit[];
}

// Progress Types
export interface SkillProgress {
  skillId: string;
  level: number;
  lessonsCompleted: string[];
  isUnlocked: boolean;
  lastPracticed: Date | null;
}

export interface LessonRecord {
  lessonId: string;
  completedAt: Date;
  accuracy: number;
  xpEarned: number;
}

export interface Progress {
  userId: string;
  skillsProgress: SkillProgress[];
  lessonsCompleted: LessonRecord[];
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isUnlocked?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface LessonCompleteResponse {
  xpEarned: number;
  accuracy: number;
  isPerfect: boolean;
  leveledUp: boolean;
  newLevel: number;
  totalXP: number;
  streak: number;
  newAchievements: string[];
  dailyGoalProgress: {
    current: number;
    goal: number;
    completed: boolean;
  };
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    xp: number;
    level: number;
  };
}
