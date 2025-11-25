import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Question } from '../../../types';

interface MatchPairsQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

interface MatchedPair {
  left: string;
  right: string;
}

const MatchPairsQuestion: React.FC<MatchPairsQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<MatchedPair[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledPairs, setShuffledPairs] = useState<{ left: string[]; right: string[] }>({
    left: [],
    right: [],
  });

  // Shuffle the pairs on mount
  useEffect(() => {
    if (question.pairs) {
      const leftWords = question.pairs.map((p) => p.left);
      const rightWords = [...question.pairs.map((p) => p.right)].sort(
        () => Math.random() - 0.5
      );
      setShuffledPairs({ left: leftWords, right: rightWords });
    }
  }, [question]);

  const handleLeftClick = (word: string) => {
    if (isSubmitted || isWordMatched(word, 'left')) return;

    if (selectedLeft === word) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(word);
      // If right is already selected, try to match
      if (selectedRight) {
        matchPair(word, selectedRight);
      }
    }
  };

  const handleRightClick = (word: string) => {
    if (isSubmitted || isWordMatched(word, 'right')) return;

    if (selectedRight === word) {
      setSelectedRight(null);
    } else {
      setSelectedRight(word);
      // If left is already selected, try to match
      if (selectedLeft) {
        matchPair(selectedLeft, word);
      }
    }
  };

  const matchPair = (left: string, right: string) => {
    setMatchedPairs([...matchedPairs, { left, right }]);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const isWordMatched = (word: string, side: 'left' | 'right'): boolean => {
    return matchedPairs.some((pair) =>
      side === 'left' ? pair.left === word : pair.right === word
    );
  };

  const handleSubmit = () => {
    if (matchedPairs.length === question.pairs?.length) {
      // Check if all pairs are correct
      const allCorrect = matchedPairs.every((matched) =>
        question.pairs?.some(
          (correct) => correct.left === matched.left && correct.right === matched.right
        )
      );

      setIsCorrect(allCorrect);
      setIsSubmitted(true);

      // Delay callback to show feedback animation
      setTimeout(() => {
        onAnswer(allCorrect, JSON.stringify(matchedPairs));
      }, 1500);
    }
  };

  const isPairCorrect = (pair: MatchedPair): boolean => {
    return question.pairs?.some(
      (correct) => correct.left === pair.left && correct.right === pair.right
    ) || false;
  };

  const getLeftWordStyle = (word: string) => {
    const isMatched = isWordMatched(word, 'left');
    const isSelected = selectedLeft === word;

    if (isSubmitted && isMatched) {
      const pair = matchedPairs.find((p) => p.left === word);
      if (pair && isPairCorrect(pair)) {
        return 'bg-green-100 border-duo-green text-duo-green-dark';
      } else {
        return 'bg-red-100 border-duo-red text-duo-red-dark';
      }
    }

    if (isMatched) {
      return 'bg-gray-100 border-gray-300 text-gray-400';
    }

    if (isSelected) {
      return 'bg-duo-blue border-duo-blue-dark text-white shadow-lg scale-[1.05]';
    }

    return 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50';
  };

  const getRightWordStyle = (word: string) => {
    const isMatched = isWordMatched(word, 'right');
    const isSelected = selectedRight === word;

    if (isSubmitted && isMatched) {
      const pair = matchedPairs.find((p) => p.right === word);
      if (pair && isPairCorrect(pair)) {
        return 'bg-green-100 border-duo-green text-duo-green-dark';
      } else {
        return 'bg-red-100 border-duo-red text-duo-red-dark';
      }
    }

    if (isMatched) {
      return 'bg-gray-100 border-gray-300 text-gray-400';
    }

    if (isSelected) {
      return 'bg-duo-blue border-duo-blue-dark text-white shadow-lg scale-[1.05]';
    }

    return 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50';
  };

  const canSubmit = matchedPairs.length === question.pairs?.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Question Prompt */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Match the pairs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          Tap words from each column to create pairs
        </motion.p>
      </div>

      {/* Match Counter */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
          <span className="font-semibold text-gray-700">
            {matchedPairs.length} / {question.pairs?.length || 0}
          </span>
          <span className="text-sm text-gray-600">pairs matched</span>
        </div>
      </div>

      {/* Matching Area */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-3">
            <AnimatePresence>
              {shuffledPairs.left.map((word, index) => (
                <motion.button
                  key={word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isSubmitted || isWordMatched(word, 'left') ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitted || isWordMatched(word, 'left') ? 1 : 0.98 }}
                  onClick={() => handleLeftClick(word)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-xl border-2 font-bold text-base transition-all text-left ${getLeftWordStyle(
                    word
                  )} ${
                    isSubmitted || isWordMatched(word, 'left')
                      ? 'cursor-default'
                      : 'cursor-pointer'
                  }`}
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <AnimatePresence>
              {shuffledPairs.right.map((word, index) => (
                <motion.button
                  key={word}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isSubmitted || isWordMatched(word, 'right') ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitted || isWordMatched(word, 'right') ? 1 : 0.98 }}
                  onClick={() => handleRightClick(word)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-xl border-2 font-bold text-base transition-all text-left ${getRightWordStyle(
                    word
                  )} ${
                    isSubmitted || isWordMatched(word, 'right')
                      ? 'cursor-default'
                      : 'cursor-pointer'
                  }`}
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleSubmit}
          disabled={!canSubmit}
          whileHover={{ scale: canSubmit ? 1.02 : 1 }}
          whileTap={{ scale: canSubmit ? 0.98 : 1 }}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-duo-btn transition-all ${
            canSubmit
              ? 'bg-duo-green text-white hover:bg-duo-green-hover shadow-duo-green-dark cursor-pointer'
              : 'bg-gray-200 text-gray-400 shadow-gray-300 cursor-not-allowed'
          }`}
        >
          CHECK
        </motion.button>
      )}

      {/* Feedback Message */}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl font-bold text-lg text-center ${
            isCorrect
              ? 'bg-green-100 text-duo-green-dark border-2 border-duo-green'
              : 'bg-red-100 text-duo-red-dark border-2 border-duo-red'
          }`}
        >
          {isCorrect ? (
            <div className="flex items-center justify-center gap-3">
              <Check className="w-6 h-6" />
              <span>Perfect match!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <X className="w-6 h-6" />
                <span>Some pairs are incorrect</span>
              </div>
              <p className="text-sm font-normal text-gray-700">
                Review the correct matches above
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MatchPairsQuestion;
