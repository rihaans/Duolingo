import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle } from 'lucide-react';
import { Skill } from '../../types';

interface SkillNodeProps {
  skill: Skill;
  onClick: (skill: Skill) => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, onClick }) => {
  // Determine skill state
  const isLocked = !skill.isUnlocked;
  const isCompleted = (skill.lessonsCompleted?.length || 0) === skill.lessons.length;
  const isInProgress = skill.isUnlocked && !isCompleted;
  const isAvailable = skill.isUnlocked && (skill.lessonsCompleted?.length || 0) === 0;

  // Calculate progress percentage
  const progress = skill.lessons.length > 0
    ? ((skill.lessonsCompleted?.length || 0) / skill.lessons.length) * 100
    : 0;

  // Determine colors based on state
  const getColors = () => {
    if (isLocked) {
      return {
        bg: 'bg-gray-300',
        border: 'border-gray-400',
        text: 'text-gray-500',
        ring: 'stroke-gray-400',
      };
    }
    if (isCompleted) {
      return {
        bg: 'bg-green-500',
        border: 'border-green-600',
        text: 'text-white',
        ring: 'stroke-green-500',
      };
    }
    if (isInProgress) {
      return {
        bg: 'bg-blue-500',
        border: 'border-blue-600',
        text: 'text-white',
        ring: 'stroke-blue-500',
      };
    }
    // Available
    return {
      bg: 'bg-yellow-400',
      border: 'border-yellow-500',
      text: 'text-yellow-900',
      ring: 'stroke-yellow-400',
    };
  };

  const colors = getColors();

  // SVG Circle calculations for progress ring
  const size = 100;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer"
      whileHover={!isLocked ? { scale: 1.1 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onClick={() => !isLocked && onClick(skill)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Ring */}
      {isInProgress && (
        <svg
          width={size + 10}
          height={size + 10}
          className="absolute -top-1 -left-1 transform -rotate-90"
        >
          <circle
            cx={(size + 10) / 2}
            cy={(size + 10) / 2}
            r={radius + 3}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={(size + 10) / 2}
            cy={(size + 10) / 2}
            r={radius + 3}
            fill="none"
            className={colors.ring}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      )}

      {/* Main Circle */}
      <motion.div
        className={`
          relative w-24 h-24 rounded-full
          ${colors.bg} ${colors.border}
          border-4 shadow-lg
          flex items-center justify-center
          ${!isLocked ? 'hover:shadow-xl' : 'cursor-not-allowed'}
        `}
      >
        {/* Icon/Emoji */}
        {isLocked ? (
          <Lock className="w-10 h-10 text-gray-600" />
        ) : (
          <span className="text-4xl">{skill.icon}</span>
        )}

        {/* Completed badge */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <CheckCircle className="w-6 h-6 text-green-500" fill="currentColor" />
          </motion.div>
        )}

        {/* Level badge */}
        {!isLocked && skill.userLevel !== undefined && skill.userLevel > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center shadow-md border-2 border-white"
          >
            <span className="text-xs font-bold text-white">{skill.userLevel}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Skill Title */}
      <motion.div
        className="mt-3 text-center max-w-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className={`font-bold text-sm ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
          {skill.title}
        </h4>
        {!isLocked && (
          <p className="text-xs text-gray-500 mt-1">
            {skill.lessonsCompleted?.length || 0} / {skill.lessons.length} lessons
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SkillNode;
