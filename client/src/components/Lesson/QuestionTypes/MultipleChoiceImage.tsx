import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Image as ImageIcon } from 'lucide-react';
import { Question } from '../../../types';
import { validateAnswer } from '../../../utils/answerValidator';

interface MultipleChoiceImageProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const MultipleChoiceImage: React.FC<MultipleChoiceImageProps> = ({
  question,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (label: string) => {
    if (!isSubmitted) {
      setSelectedOption(label);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const correct = validateAnswer(selectedOption, question.correctAnswer);
      setIsCorrect(correct);
      setIsSubmitted(true);

      setTimeout(() => {
        onAnswer(correct, selectedOption);
      }, 1500);
    }
  };

  const getOptionStyle = (label: string) => {
    if (!isSubmitted) {
      return selectedOption === label
        ? 'border-duo-blue bg-blue-50 scale-105'
        : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50';
    }

    const isThisCorrect = validateAnswer(label, question.correctAnswer);
    if (label === selectedOption) {
      return isCorrect
        ? 'border-duo-green bg-green-50'
        : 'border-duo-red bg-red-50';
    }

    if (!isCorrect && isThisCorrect) {
      return 'border-duo-green bg-green-50';
    }

    return 'border-gray-300 bg-white opacity-60';
  };

  const getOptionIcon = (label: string) => {
    if (!isSubmitted) return null;

    const isThisCorrect = validateAnswer(label, question.correctAnswer);
    if (label === selectedOption) {
      return (
        <div
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-duo-green' : 'bg-duo-red'
          }`}
        >
          {isCorrect ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            <X className="w-5 h-5 text-white" />
          )}
        </div>
      );
    }

    if (!isCorrect && isThisCorrect) {
      return (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-duo-green flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      );
    }

    return null;
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
          Select the correct image
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-semibold text-gray-700"
        >
          {question.prompt}
        </motion.p>
      </div>

      {/* Image Options Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {question.imageOptions?.map((option, index) => (
          <motion.button
            key={option.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitted ? 1 : 0.95 }}
            onClick={() => handleOptionClick(option.label)}
            disabled={isSubmitted}
            className={`relative p-6 rounded-2xl border-4 transition-all duration-200 ${getOptionStyle(
              option.label
            )} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {/* Image Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              {option.image ? (
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 px-4">{option.label}</p>
                </div>
              )}
            </div>

            {/* Label */}
            <p className="font-bold text-lg text-gray-800">{option.label}</p>

            {/* Check/X Icon */}
            {getOptionIcon(option.label)}
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
              <span>Perfect!</span>
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

export default MultipleChoiceImage;
