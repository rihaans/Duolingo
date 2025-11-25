import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  animated?: boolean;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({
  streak,
  size = 'medium',
  showLabel = false,
  animated = false,
}) => {
  // Determine flame color based on streak length
  const getFlameColor = () => {
    if (streak >= 30) return 'text-blue-500'; // 30+ days: Blue
    if (streak >= 7) return 'text-red-500'; // 7-29 days: Red
    return 'text-orange-500'; // 0-6 days: Orange
  };

  const getBgColor = () => {
    if (streak >= 30) return 'bg-blue-50 border-blue-200';
    if (streak >= 7) return 'bg-red-50 border-red-200';
    return 'bg-orange-50 border-orange-200';
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-3 py-2 text-base',
    large: 'px-4 py-3 text-lg',
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  const Container = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
        },
      }
    : {};

  return (
    <Container
      {...animationProps}
      className={`inline-flex items-center gap-2 rounded-full border-2 ${getBgColor()} ${sizeClasses[size]}`}
    >
      <Flame className={`${iconSizes[size]} ${getFlameColor()} fill-current`} />
      <span className="font-bold text-gray-800">{streak}</span>
      {showLabel && <span className="text-gray-600 text-sm">day streak</span>}
    </Container>
  );
};

export default StreakDisplay;
