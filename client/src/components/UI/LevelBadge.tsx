import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface LevelBadgeProps {
  level: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  animated?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  size = 'medium',
  showLabel = false,
  animated = false,
}) => {
  const sizeConfig = {
    small: {
      container: 'w-12 h-12',
      text: 'text-lg',
      crown: 'w-4 h-4',
      label: 'text-xs',
    },
    medium: {
      container: 'w-16 h-16',
      text: 'text-2xl',
      crown: 'w-5 h-5',
      label: 'text-sm',
    },
    large: {
      container: 'w-24 h-24',
      text: 'text-4xl',
      crown: 'w-6 h-6',
      label: 'text-base',
    },
  };

  const config = sizeConfig[size];

  const Container = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0 },
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
        },
      }
    : {};

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <Container
        {...animationProps}
        className={`${config.container} rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg relative`}
      >
        {/* Crown Icon */}
        <div className="absolute -top-1 -right-1">
          <Crown className={`${config.crown} text-yellow-400 fill-current`} />
        </div>

        {/* Level Number */}
        <span className={`${config.text} font-extrabold text-white`}>{level}</span>
      </Container>

      {showLabel && (
        <span className={`${config.label} font-semibold text-gray-600`}>Level {level}</span>
      )}
    </div>
  );
};

export default LevelBadge;
