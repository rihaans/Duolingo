import React from 'react';
import { motion } from 'framer-motion';
import { HeartCrack, RefreshCw, Home } from 'lucide-react';

interface LessonFailedProps {
  onRetry: () => void;
  onGoHome: () => void;
}

const LessonFailed: React.FC<LessonFailedProps> = ({ onRetry, onGoHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Broken Heart Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-6"
        >
          <HeartCrack className="w-24 h-24 text-duo-red mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Out of Hearts!
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-8"
        >
          Don't worry! You can retry this lesson or come back later when your hearts
          refill.
        </motion.p>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h3 className="font-bold text-gray-800 text-xl mb-4">💡 How Hearts Work</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-duo-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p className="text-gray-700">
                You lose 1 heart for each incorrect answer
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-duo-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p className="text-gray-700">Hearts refill every 5 hours (max 5)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-duo-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p className="text-gray-700">Practice mode has unlimited hearts!</p>
            </div>
          </div>

          {/* Heart Refill Timer - Placeholder */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Next heart in:</p>
            <p className="text-2xl font-bold text-duo-red">4h 23m</p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Retry Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="w-full py-5 bg-duo-green text-white rounded-2xl font-bold text-xl shadow-duo-btn shadow-duo-green-dark hover:bg-duo-green-hover transition-colors flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-6 h-6" />
            RETRY LESSON
          </motion.button>

          {/* Go Home Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoHome}
            className="w-full py-5 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            GO TO DASHBOARD
          </motion.button>
        </div>

        {/* Practice Mode Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
        >
          <p className="text-sm text-blue-900">
            <span className="font-bold">💪 Pro Tip:</span> Try Practice Mode for
            unlimited hearts and targeted review!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LessonFailed;
