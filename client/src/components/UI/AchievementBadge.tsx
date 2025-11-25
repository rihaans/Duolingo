import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  icon: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  name,
  description,
  isUnlocked,
  size = 'medium',
  onClick,
}) => {
  const sizeConfig = {
    small: {
      container: 'w-20 h-20',
      icon: 'text-3xl',
      nameSize: 'text-xs',
      descSize: 'text-xs',
    },
    medium: {
      container: 'w-28 h-28',
      icon: 'text-4xl',
      nameSize: 'text-sm',
      descSize: 'text-xs',
    },
    large: {
      container: 'w-36 h-36',
      icon: 'text-5xl',
      nameSize: 'text-base',
      descSize: 'text-sm',
    },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${onClick ? 'cursor-pointer' : ''} text-center`}
    >
      {/* Badge Circle */}
      <div
        className={`${config.container} mx-auto rounded-full flex items-center justify-center mb-2 relative transition-all ${
          isUnlocked
            ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg'
            : 'bg-gray-200 grayscale opacity-60'
        }`}
      >
        {isUnlocked ? (
          <div className={config.icon}>{icon}</div>
        ) : (
          <Lock className="w-8 h-8 text-gray-400" />
        )}
      </div>

      {/* Badge Name */}
      <div className={`font-bold ${config.nameSize} ${isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
        {isUnlocked ? name : '???'}
      </div>

      {/* Badge Description (shown on hover or if unlocked) */}
      {isUnlocked && (
        <div className={`${config.descSize} text-gray-600 mt-1 max-w-[120px] mx-auto`}>
          {description}
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;
