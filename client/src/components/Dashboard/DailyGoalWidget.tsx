import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { progressService } from '../../services/progressService';
import toast from 'react-hot-toast';

const DailyGoalWidget: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isChangingGoal, setIsChangingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(user?.dailyGoal || 100);

  if (!user) return null;

  const progress = user.todayXP;
  const goal = user.dailyGoal;
  const percentage = Math.min((progress / goal) * 100, 100);
  const isGoalReached = progress >= goal;

  // SVG Circle calculations
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const handleChangeGoal = async () => {
    try {
      await progressService.updateDailyGoal(newGoal);
      updateUser({ ...user, dailyGoal: newGoal });
      setIsChangingGoal(false);
      toast.success('Daily goal updated!');
    } catch (error) {
      toast.error('Failed to update goal');
    }
  };

  const goalOptions = [
    { xp: 50, label: 'Casual', time: '~5 min/day' },
    { xp: 100, label: 'Regular', time: '~10 min/day' },
    { xp: 150, label: 'Serious', time: '~15 min/day' },
    { xp: 200, label: 'Intense', time: '~20 min/day' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Daily Goal</h3>

      {!isChangingGoal ? (
        <div className="flex flex-col items-center">
          {/* Circular Progress */}
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
              />
              {/* Progress circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={isGoalReached ? '#10B981' : '#3B82F6'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-gray-800">{progress}</p>
              <p className="text-sm text-gray-500">/ {goal} XP</p>
            </div>

            {/* Goal reached indicator */}
            {isGoalReached && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">✓</span>
              </motion.div>
            )}
          </div>

          {/* Status message */}
          <div className="mt-6 text-center">
            {isGoalReached ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-bold"
              >
                Goal reached! Great job!
              </motion.p>
            ) : (
              <p className="text-gray-600">
                {goal - progress} XP to go
              </p>
            )}
          </div>

          {/* Change goal button */}
          <button
            onClick={() => setIsChangingGoal(true)}
            className="mt-4 px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-xl font-bold transition-colors"
          >
            Change goal
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-4">Select your daily goal:</p>

          <div className="space-y-2 w-full mb-6">
            {goalOptions.map((option) => (
              <button
                key={option.xp}
                onClick={() => setNewGoal(option.xp)}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-all text-left ${
                  newGoal === option.xp
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option.label}</span>
                  <span className="text-sm opacity-80">{option.xp} XP {option.time}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => setIsChangingGoal(false)}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleChangeGoal}
              className="flex-1 py-2 px-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyGoalWidget;
