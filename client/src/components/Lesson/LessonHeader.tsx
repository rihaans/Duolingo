import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface LessonHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  hearts: number;
  onClose: () => void;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  hearts,
  onClose,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const handleCloseClick = () => {
    setShowConfirmation(true);
  };

  const confirmClose = () => {
    onClose();
  };

  const cancelClose = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-gray-200 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseClick}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close lesson"
            >
              <X className="w-7 h-7 text-gray-500" />
            </motion.button>

            {/* Progress Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-duo-green rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                {currentQuestion} / {totalQuestions}
              </p>
            </div>

            {/* Hearts Display */}
            <div className="flex-shrink-0 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      index < hearts
                        ? 'fill-duo-red text-duo-red'
                        : 'fill-gray-200 text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
              <span className="ml-2 text-duo-red font-bold text-lg">{hearts}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelClose}
              className="fixed inset-0 bg-black/50 z-[60]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 z-[70]"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Are you sure you want to quit?
              </h3>
              <p className="text-gray-600 mb-8">
                You'll lose all progress from this lesson if you quit now.
              </p>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelClose}
                  className="w-full py-4 bg-duo-green text-white rounded-2xl font-bold text-lg shadow-duo-btn shadow-duo-green-dark hover:bg-duo-green-hover transition-colors"
                >
                  KEEP LEARNING
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmClose}
                  className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors"
                >
                  END SESSION
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LessonHeader;
