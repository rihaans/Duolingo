import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Question } from '../../../types';
import { validateAnswer } from '../../../utils/answerValidator';

interface MultipleChoiceTextProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const MultipleChoiceText: React.FC<MultipleChoiceTextProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (option: string) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const correct = validateAnswer(selectedOption, question.correctAnswer);
      setIsCorrect(correct);
      setIsSubmitted(true);

      // Delay callback to show feedback animation
      setTimeout(() => {
        onAnswer(correct, selectedOption);
      }, 1500);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isSubmitted) {
      return selectedOption === option
        ? 'bg-duo-blue border-duo-blue-dark text-white shadow-lg scale-[1.02]'
        : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:bg-gray-50';
    }

    // After submission, show correct/incorrect
    const isThisCorrect = validateAnswer(option, question.correctAnswer);
    if (option === selectedOption) {
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

  const getOptionIcon = (option: string) => {
    if (!isSubmitted) return null;

    const isThisCorrect = validateAnswer(option, question.correctAnswer);
    if (option === selectedOption) {
      return isCorrect ? (
        <Check className="w-6 h-6 text-duo-green" />
      ) : (
        <X className="w-6 h-6 text-duo-red" />
      );
    }

    if (!isCorrect && isThisCorrect) {
      return <Check className="w-6 h-6 text-duo-green" />;
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
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
        >
          Which one of these is correct?
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

      {/* Answer Options */}
      <div className="space-y-4 mb-8">
        {question.options?.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
            onClick={() => handleOptionClick(option)}
            disabled={isSubmitted}
            className={`w-full p-6 rounded-2xl border-2 font-bold text-lg transition-all duration-200 flex items-center justify-between ${getOptionStyle(
              option
            )} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
          >
            <span className="text-left flex-1">{option}</span>
            {getOptionIcon(option)}
          </motion.button>
        ))}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleSubmit}
          disabled={!selectedOption}
          whileHover={{ scale: selectedOption ? 1.02 : 1 }}
          whileTap={{ scale: selectedOption ? 0.98 : 1 }}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-duo-btn transition-all ${
            selectedOption
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

export default MultipleChoiceText;
