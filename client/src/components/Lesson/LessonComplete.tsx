import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, TrendingUp, CheckCircle2 } from 'lucide-react';
import { LessonCompleteResponse } from '../../types';
import { useAudio } from '../../hooks/useAudio';

interface LessonCompleteProps {
  result: LessonCompleteResponse;
  onContinue: () => void;
}

const LessonComplete: React.FC<LessonCompleteProps> = ({
  result,
  onContinue,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { playLevelUp } = useAudio();

  useEffect(() => {
    setShowConfetti(true);
    // Play level up sound if user leveled up
    if (result.leveledUp) {
      playLevelUp();
    }
  }, [result.leveledUp, playLevelUp]);

  const accuracyPercentage = Math.round(result.accuracy * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <Trophy className="w-24 h-24 text-yellow-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
          >
            {result.isPerfect ? 'Perfect!' : 'Lesson Complete!'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600"
          >
            {result.isPerfect
              ? "You didn't make a single mistake!"
              : 'Great job! Keep up the good work!'}
          </motion.p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* XP Earned */}
            <div className="text-center p-4 bg-yellow-50 rounded-2xl">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-3xl font-bold text-yellow-600">+{result.xpEarned}</p>
              <p className="text-sm text-gray-600 font-semibold">XP Earned</p>
            </div>

            {/* Accuracy */}
            <div className="text-center p-4 bg-green-50 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-duo-green mx-auto mb-2" />
              <p className="text-3xl font-bold text-duo-green">{accuracyPercentage}%</p>
              <p className="text-sm text-gray-600 font-semibold">Accuracy</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="space-y-4">
            {/* Total XP */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-duo-blue" />
                <span className="font-semibold text-gray-700">Total XP</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">{result.totalXP}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="font-semibold text-gray-700">Day Streak</span>
              </div>
              <span className="text-2xl font-bold text-orange-500">{result.streak}</span>
            </div>
          </div>

          {/* Level Up Banner */}
          {result.leveledUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white text-center"
            >
              <p className="text-sm font-semibold mb-1">🎉 LEVEL UP! 🎉</p>
              <p className="text-3xl font-bold">Level {result.newLevel}</p>
            </motion.div>
          )}

          {/* Daily Goal Progress */}
          {result.dailyGoalProgress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Daily Goal</span>
                <span className="text-sm text-gray-600">
                  {result.dailyGoalProgress.current} / {result.dailyGoalProgress.goal} XP
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      (result.dailyGoalProgress.current / result.dailyGoalProgress.goal) * 100,
                      100
                    )}%`,
                  }}
                  transition={{ delay: 1, duration: 1 }}
                  className="h-full bg-duo-green rounded-full"
                />
              </div>
              {result.dailyGoalProgress.completed && (
                <p className="text-center text-duo-green font-bold text-sm mt-2">
                  ✓ Daily goal reached!
                </p>
              )}
            </motion.div>
          )}

          {/* New Achievements */}
          {result.newAchievements && result.newAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl"
            >
              <p className="font-bold text-blue-900 mb-2">🏆 New Achievements!</p>
              <div className="flex flex-wrap gap-2">
                {result.newAchievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm font-semibold"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-5 bg-duo-green text-white rounded-2xl font-bold text-xl shadow-duo-btn shadow-duo-green-dark hover:bg-duo-green-hover transition-colors"
        >
          CONTINUE
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LessonComplete;
