import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  height?: 'small' | 'medium' | 'large';
  color?: 'green' | 'blue' | 'purple' | 'yellow';
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  height = 'medium',
  color = 'green',
  showLabel = false,
  animated = true,
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  const heightClasses = {
    small: 'h-2',
    medium: 'h-3',
    large: 'h-4',
  };

  const colorClasses = {
    green: 'bg-duo-green',
    blue: 'bg-duo-blue',
    purple: 'bg-duo-purple',
    yellow: 'bg-duo-yellow',
  };

  const ProgressFill = animated ? motion.div : 'div';
  const fillProps = animated
    ? {
        initial: { width: 0 },
        animate: { width: `${percentage}%` },
        transition: { duration: 0.8, ease: 'easeOut' },
      }
    : { style: { width: `${percentage}%` } };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            {current} / {total}
          </span>
          <span className="text-sm font-bold text-gray-700">{Math.round(percentage)}%</span>
        </div>
      )}

      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <ProgressFill
          {...fillProps}
          className={`h-full ${colorClasses[color]} rounded-full transition-all`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
