import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface XPBadgeProps {
  xp: number;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  showIcon?: boolean;
}

const XPBadge: React.FC<XPBadgeProps> = ({
  xp,
  size = 'medium',
  animated = false,
  showIcon = true,
}) => {
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  const Badge = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
        },
      }
    : {};

  return (
    <Badge
      {...animationProps}
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-duo-yellow to-duo-yellow-light text-gray-800 font-bold rounded-full shadow-md ${sizeClasses[size]}`}
    >
      {showIcon && <Star className={`${iconSizes[size]} fill-current`} />}
      <span>+{xp} XP</span>
    </Badge>
  );
};

export default XPBadge;
