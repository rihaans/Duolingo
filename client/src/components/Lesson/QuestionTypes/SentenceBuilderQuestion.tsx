import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trash2 } from 'lucide-react';
import { Question } from '../../../types';
import { validateAnswer } from '../../../utils/answerValidator';

interface SentenceBuilderQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const SentenceBuilderQuestion: React.FC<SentenceBuilderQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    question.wordBank || []
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordClick = (word: string, index: number) => {
    if (!isSubmitted) {
      // Add word to selected words
      setSelectedWords([...selectedWords, word]);
      // Remove from available words
      setAvailableWords(availableWords.filter((_, i) => i !== index));
    }
  };

  const handleSelectedWordClick = (index: number) => {
    if (!isSubmitted) {
      const word = selectedWords[index];
      // Remove from selected words
      setSelectedWords(selectedWords.filter((_, i) => i !== index));
      // Add back to available words
      setAvailableWords([...availableWords, word]);
    }
  };

  const handleClear = () => {
    if (!isSubmitted) {
      setAvailableWords([...(question.wordBank || [])]);
      setSelectedWords([]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length > 0) {
      const userAnswer = selectedWords.join(' ');
      const correct = validateAnswer(userAnswer, question.correctAnswer);
      setIsCorrect(correct);
      setIsSubmitted(true);

      // Delay callback to show feedback animation
      setTimeout(() => {
        onAnswer(correct, userAnswer);
      }, 1500);
    }
  };

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
          Write this in Spanish
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100"
        >
          <p className="text-xl md:text-2xl font-semibold text-gray-700">
            {question.prompt}
          </p>
        </motion.div>
      </div>

      {/* Answer Area - Built Sentence */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Your Answer
          </p>
          {selectedWords.length > 0 && !isSubmitted && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-duo-red transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        <motion.div
          className={`min-h-[100px] p-6 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center transition-all ${
            isSubmitted
              ? isCorrect
                ? 'bg-green-50 border-duo-green'
                : 'bg-red-50 border-duo-red'
              : selectedWords.length > 0
              ? 'bg-white border-gray-400'
              : 'bg-gray-50 border-gray-300'
          }`}
        >
          <AnimatePresence>
            {selectedWords.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 text-lg"
              >
                Tap the words below to build your sentence
              </motion.p>
            ) : (
              selectedWords.map((word, index) => (
                <motion.button
                  key={`${word}-${index}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitted ? 1 : 0.95 }}
                  onClick={() => handleSelectedWordClick(index)}
                  disabled={isSubmitted}
                  className={`px-4 py-3 rounded-xl border-2 font-bold text-base transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-green-100 border-duo-green text-duo-green-dark cursor-default'
                        : 'bg-red-100 border-duo-red text-duo-red-dark cursor-default'
                      : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  {word}
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Word Bank */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
          Word Bank
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <AnimatePresence>
            {availableWords.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.95 }}
                onClick={() => handleWordClick(word, index)}
                disabled={isSubmitted}
                className={`px-5 py-4 rounded-xl border-2 font-bold text-base transition-all ${
                  isSubmitted
                    ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-default'
                    : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50 cursor-pointer shadow-sm hover:shadow-md'
                }`}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleSubmit}
          disabled={selectedWords.length === 0}
          whileHover={{ scale: selectedWords.length > 0 ? 1.02 : 1 }}
          whileTap={{ scale: selectedWords.length > 0 ? 0.98 : 1 }}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-duo-btn transition-all ${
            selectedWords.length > 0
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
              <span>Excellent!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <X className="w-6 h-6" />
                <span>Not quite!</span>
              </div>
              <p className="text-sm font-normal text-gray-700">
                Correct answer: {Array.isArray(question.correctAnswer)
                  ? question.correctAnswer[0]
                  : question.correctAnswer}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SentenceBuilderQuestion;
