import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Trophy,
  Flame,
  Zap,
  BookOpen,
  Target,
  Calendar,
  Award,
  Lock,
  Loader2,
  Edit2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { progressService } from '../../services/progressService';
import { Achievement } from '../../types';
import TopBar from '../Dashboard/TopBar';
import DefaultAvatar from '../UI/DefaultAvatar';
import toast from 'react-hot-toast';

interface AchievementsData {
  achievements: Achievement[];
  unlocked: number;
  total: number;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<AchievementsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const achievementsData = await progressService.getAchievements();
      setAchievements(achievementsData);

      // Get progress to calculate lessons completed
      const progress = await progressService.getProgress();
      setLessonsCompleted(progress.lessonsCompleted?.length || 0);
    } catch (error) {
      console.error('Failed to load profile data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <TopBar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const getLanguageFlag = (language: string) => {
    const flags: { [key: string]: string } = {
      spanish: '🇪🇸',
      french: '🇫🇷',
      german: '🇩🇪',
      italian: '🇮🇹',
      portuguese: '🇵🇹',
      japanese: '🇯🇵',
      korean: '🇰🇷',
      chinese: '🇨🇳',
    };
    return flags[language.toLowerCase()] || '🌍';
  };

  const getAchievementIcon = (icon: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      trophy: <Trophy className="w-6 h-6" />,
      flame: <Flame className="w-6 h-6" />,
      zap: <Zap className="w-6 h-6" />,
      book: <BookOpen className="w-6 h-6" />,
      target: <Target className="w-6 h-6" />,
      award: <Award className="w-6 h-6" />,
      calendar: <Calendar className="w-6 h-6" />,
    };
    return icons[icon] || <Award className="w-6 h-6" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      streak: 'from-orange-400 to-red-500',
      xp: 'from-blue-400 to-purple-500',
      lessons: 'from-green-400 to-teal-500',
      skills: 'from-pink-400 to-rose-500',
      special: 'from-yellow-400 to-orange-500',
    };
    return colors[category.toLowerCase()] || 'from-gray-400 to-gray-500';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <TopBar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Profile Header Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                ) : (
                  <DefaultAvatar size="large" className="ring-4 ring-white shadow-lg" />
                )}
                {/* Level Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg ring-4 ring-white">
                  {user.level}
                </div>
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {user.displayName}
                </h1>
                <p className="text-gray-600 mb-4">@{user.username}</p>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="px-4 py-2 bg-blue-50 rounded-xl border-2 border-blue-200 flex items-center gap-2">
                    <span className="text-2xl">{getLanguageFlag(user.learningLanguage)}</span>
                    <span className="text-sm font-medium text-gray-700">
                      Learning{' '}
                      <span className="font-bold text-blue-600 capitalize">
                        {user.learningLanguage}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/edit-profile')}
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/settings')}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {/* Total XP */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold mb-1">{user.totalXP}</p>
              <p className="text-blue-100 text-sm font-medium">Total XP</p>
            </motion.div>

            {/* Current Streak */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold mb-1">{user.currentStreak}</p>
              <p className="text-orange-100 text-sm font-medium">Day Streak</p>
            </motion.div>

            {/* Level */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold mb-1">{user.level}</p>
              <p className="text-yellow-100 text-sm font-medium">Level</p>
            </motion.div>

            {/* Lessons Completed */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8" />
              </div>
              <p className="text-3xl font-bold mb-1">{lessonsCompleted}</p>
              <p className="text-green-100 text-sm font-medium">Lessons</p>
            </motion.div>
          </motion.div>

          {/* Detailed Statistics */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-500" />
              Detailed Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Weekly XP</p>
                <p className="text-3xl font-bold text-blue-600">{user.weeklyXP}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                <p className="text-sm text-gray-600 mb-1">Today's XP</p>
                <p className="text-3xl font-bold text-purple-600">{user.todayXP}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-100">
                <p className="text-sm text-gray-600 mb-1">Longest Streak</p>
                <p className="text-3xl font-bold text-orange-600">{user.longestStreak} days</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border-2 border-red-100">
                <p className="text-sm text-gray-600 mb-1">Hearts Remaining</p>
                <p className="text-3xl font-bold text-red-600">{user.hearts}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-100">
                <p className="text-sm text-gray-600 mb-1">Daily Goal</p>
                <p className="text-3xl font-bold text-green-600">{user.dailyGoal} XP</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-100">
                <p className="text-sm text-gray-600 mb-1">Achievements</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {achievements?.unlocked || 0}/{achievements?.total || 0}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                Achievements
              </h2>
              <div className="px-4 py-2 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <span className="text-sm font-medium text-gray-700">
                  <span className="font-bold text-yellow-600">{achievements?.unlocked || 0}</span>
                  {' '}/{' '}
                  <span className="text-gray-600">{achievements?.total || 0}</span>
                  {' '}unlocked
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {achievements?.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: achievement.isUnlocked ? 1.1 : 1 }}
                  className={`relative p-4 rounded-2xl border-2 text-center transition-all ${
                    achievement.isUnlocked
                      ? `bg-gradient-to-br ${getCategoryColor(achievement.category)} text-white shadow-lg cursor-pointer`
                      : 'bg-gray-100 border-gray-200 text-gray-400'
                  }`}
                  title={achievement.description}
                >
                  {/* Lock overlay for locked achievements */}
                  {!achievement.isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                      <Lock className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  {/* Achievement content */}
                  <div className={!achievement.isUnlocked ? 'opacity-30' : ''}>
                    <div className="flex justify-center mb-2">
                      {getAchievementIcon(achievement.icon)}
                    </div>
                    <p className="text-xs font-bold mb-1 line-clamp-2">
                      {achievement.name}
                    </p>
                  </div>

                  {/* Unlocked badge */}
                  {achievement.isUnlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                    >
                      <span className="text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Achievement categories legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3 font-medium">Categories:</p>
              <div className="flex flex-wrap gap-3">
                {['streak', 'xp', 'lessons', 'skills', 'special'].map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-4 h-4 rounded bg-gradient-to-br ${getCategoryColor(category)}`}></div>
                    <span className="text-sm text-gray-600 capitalize">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
