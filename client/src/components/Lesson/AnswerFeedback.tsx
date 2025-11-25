import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface AnswerFeedbackProps {
  isVisible: boolean;
  isCorrect: boolean;
  correctAnswer?: string | string[];
  userAnswer?: string;
  onContinue: () => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  isVisible,
  isCorrect,
  correctAnswer,
  userAnswer,
  onContinue,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed bottom-0 left-0 right-0 z-50 shadow-2xl ${
            isCorrect ? 'bg-duo-green' : 'bg-duo-red'
          }`}
        >
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between gap-6">
              {/* Left Side - Feedback Content */}
              <div className="flex items-center gap-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${
                    isCorrect ? 'bg-white/20' : 'bg-white/20'
                  }`}
                >
                  {isCorrect ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <X className="w-8 h-8 text-white" />
                  )}
                </motion.div>

                {/* Text */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-1"
                  >
                    {isCorrect ? 'Excellent!' : 'Not quite!'}
                  </motion.h3>

                  {!isCorrect && correctAnswer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/90 text-sm md:text-base"
                    >
                      <p className="font-semibold mb-1">Correct answer:</p>
                      <p className="text-lg font-bold">
                        {Array.isArray(correctAnswer)
                          ? correctAnswer.join(' / ')
                          : correctAnswer}
                      </p>
                      {userAnswer && (
                        <p className="mt-2 text-white/70 text-sm">
                          You wrote: <span className="font-semibold">{userAnswer}</span>
                        </p>
                      )}
                    </motion.div>
                  )}

                  {isCorrect && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/90 text-sm md:text-base"
                    >
                      You're doing great! Keep it up!
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Right Side - Continue Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="flex-shrink-0 px-8 py-4 bg-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
                style={{ color: isCorrect ? '#58CC02' : '#FF4B4B' }}
              >
                CONTINUE
              </motion.button>
            </div>

            {/* Progress indicator - optional subtle animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-white/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnswerFeedback;
