import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, AlertCircle } from 'lucide-react';
import { Question } from '../../../types';
import { validateAnswer } from '../../../utils/answerValidator';

interface TranslationQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const TranslationQuestion: React.FC<TranslationQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      const isCorrect = validateAnswer(userInput, question.correctAnswer);
      onAnswer(isCorrect, userInput);
    }
  };

  const playAudio = () => {
    if (question.audioUrl) {
      const audio = new Audio(question.audioUrl);
      audio.play();
    }
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
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          {question.type === 'translation' && question.audioUrl
            ? 'Type what you hear'
            : 'Translate this sentence'}
        </motion.h2>

        {/* Audio Player for Listen & Translate */}
        {question.audioUrl && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playAudio}
            className="mb-6 p-6 bg-duo-blue hover:bg-duo-blue-hover text-white rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-3 mx-auto"
          >
            <Volume2 className="w-8 h-8" />
            <span className="font-bold text-lg">Play Audio</span>
          </motion.button>
        )}

        {/* Text to Translate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-2 border-gray-100"
        >
          <p className="text-xl md:text-2xl font-semibold text-gray-700">
            {question.prompt}
          </p>
        </motion.div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Write this in English
          </label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-duo-blue focus:ring-4 focus:ring-duo-blue/20 outline-none transition-all"
            autoFocus
          />
        </motion.div>

        {/* Hint Section */}
        {question.hint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {!showHint ? (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-duo-blue hover:text-duo-blue-hover font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <AlertCircle className="w-4 h-4" />
                Show Hint
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-yellow-900 text-sm">Hint</p>
                    <p className="text-yellow-800 text-sm mt-1">{question.hint}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!userInput.trim()}
          whileHover={{ scale: userInput.trim() ? 1.02 : 1 }}
          whileTap={{ scale: userInput.trim() ? 0.98 : 1 }}
          className={`w-full py-5 rounded-2xl font-bold text-xl shadow-duo-btn transition-all ${
            userInput.trim()
              ? 'bg-duo-green text-white hover:bg-duo-green-hover shadow-duo-green-dark cursor-pointer'
              : 'bg-gray-200 text-gray-400 shadow-gray-300 cursor-not-allowed'
          }`}
        >
          CHECK
        </motion.button>
      </form>

      {/* Character Count */}
      {userInput && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 text-right mt-2"
        >
          {userInput.length} characters
        </motion.p>
      )}
    </motion.div>
  );
};

export default TranslationQuestion;
