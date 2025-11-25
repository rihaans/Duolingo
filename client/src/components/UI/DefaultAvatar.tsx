import React from 'react';

interface DefaultAvatarProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ size = 'medium', className = '' }) => {
  const sizeMap = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-32 h-32',
  };

  return (
    <div className={`${sizeMap[size]} ${className} bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center overflow-hidden`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-2"
      >
        {/* Head */}
        <circle cx="12" cy="8" r="4" fill="white" opacity="0.9" />
        {/* Body */}
        <path
          d="M4 20c0-4 3.5-7 8-7s8 3 8 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

export default DefaultAvatar;
