import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Question } from '../../../types';
import { validateAnswer } from '../../../utils/answerValidator';

interface FillInBlankQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const FillInBlankQuestion: React.FC<FillInBlankQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordClick = (word: string) => {
    if (!isSubmitted) {
      setSelectedWord(word);
    }
  };

  const handleSubmit = () => {
    if (selectedWord) {
      const correct = validateAnswer(selectedWord, question.correctAnswer);
      setIsCorrect(correct);
      setIsSubmitted(true);

      // Delay callback to show feedback animation
      setTimeout(() => {
        onAnswer(correct, selectedWord);
      }, 1500);
    }
  };

  // Split prompt to show blank
  const renderPromptWithBlank = () => {
    const parts = question.prompt.split('___');
    return (
      <div className="flex items-center justify-center flex-wrap gap-2 text-xl md:text-2xl font-semibold text-gray-700">
        {parts[0] && <span>{parts[0]}</span>}

        {/* The blank space / selected word */}
        <span
          className={`inline-flex items-center justify-center min-w-[120px] px-4 py-2 rounded-xl border-2 border-dashed transition-all ${
            selectedWord
              ? isSubmitted
                ? isCorrect
                  ? 'bg-green-100 border-duo-green text-duo-green-dark'
                  : 'bg-red-100 border-duo-red text-duo-red-dark'
                : 'bg-duo-blue text-white border-duo-blue-dark'
              : 'bg-gray-100 border-gray-400 text-gray-400'
          }`}
        >
          {selectedWord || '___'}
        </span>

        {parts[1] && <span>{parts[1]}</span>}
      </div>
    );
  };

  const getWordStyle = (word: string) => {
    if (!isSubmitted) {
      return selectedWord === word
        ? 'bg-duo-blue border-duo-blue-dark text-white shadow-lg scale-[1.02]'
        : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50';
    }

    // After submission, show correct/incorrect
    const isThisCorrect = validateAnswer(word, question.correctAnswer);
    if (word === selectedWord) {
      return isCorrect
        ? 'bg-green-100 border-duo-green text-duo-green-dark'
        : 'bg-red-100 border-duo-red text-duo-red-dark';
    }

    // Show the correct answer if user was wrong
    if (!isCorrect && isThisCorrect) {
      return 'bg-green-100 border-duo-green text-duo-green-dark';
    }

    return 'bg-white border-gray-300 text-gray-400';
  };

  const getWordIcon = (word: string) => {
    if (!isSubmitted) return null;

    const isThisCorrect = validateAnswer(word, question.correctAnswer);
    if (word === selectedWord) {
      return isCorrect ? (
        <Check className="w-5 h-5 text-duo-green" />
      ) : (
        <X className="w-5 h-5 text-duo-red" />
      );
    }

    if (!isCorrect && isThisCorrect) {
      return <Check className="w-5 h-5 text-duo-green" />;
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Question Prompt */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-8"
        >
          Fill in the blank
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100"
        >
          {renderPromptWithBlank()}
        </motion.div>
      </div>

      {/* Word Bank */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-gray-600 mb-4 text-center uppercase tracking-wide">
          Select the correct word
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(question.options || question.wordBank)?.map((word, index) => (
            <motion.button
              key={word}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitted ? 1 : 0.95 }}
              onClick={() => handleWordClick(word)}
              disabled={isSubmitted}
              className={`p-4 rounded-xl border-2 font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${getWordStyle(
                word
              )} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span>{word}</span>
              {getWordIcon(word)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleSubmit}
          disabled={!selectedWord}
          whileHover={{ scale: selectedWord ? 1.02 : 1 }}
          whileTap={{ scale: selectedWord ? 0.98 : 1 }}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-duo-btn transition-all ${
            selectedWord
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

export default FillInBlankQuestion;
