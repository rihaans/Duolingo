import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Volume2, VolumeX } from 'lucide-react';
import { Question } from '../../../types';
import { validateAnswer } from '../../../utils/answerValidator';
import { useAudio } from '../../../hooks/useAudio';

interface ListenAndTypeQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
}

const ListenAndTypeQuestion: React.FC<ListenAndTypeQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

  // Use audio hook for playback
  const { play: playNormalSpeed } = useAudio(question.audioUrl || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSubmitted) {
      setUserInput(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (userInput.trim()) {
      const correct = validateAnswer(userInput.trim(), question.correctAnswer);
      setIsCorrect(correct);
      setIsSubmitted(true);

      // Delay callback to show feedback animation
      setTimeout(() => {
        onAnswer(correct, userInput.trim());
      }, 1500);
    }
  };

  const handlePlayAudio = () => {
    setHasPlayedAudio(true);
    playNormalSpeed();
  };

  const handlePlaySlow = () => {
    // For now, we'll just play the same audio
    // In a real implementation, you would have a separate slow audio file
    setHasPlayedAudio(true);
    playNormalSpeed();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.trim() && !isSubmitted) {
      handleSubmit();
    }
  };

  // For demo purposes, if no audio URL is provided, use text-to-speech
  const useSpeechSynthesis = !question.audioUrl;

  const handleSpeakText = (text: string, slow: boolean = false) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Spanish
      utterance.rate = slow ? 0.6 : 1;
      window.speechSynthesis.speak(utterance);
      setHasPlayedAudio(true);
    }
  };

  const playAudio = () => {
    if (useSpeechSynthesis) {
      const textToSpeak = Array.isArray(question.correctAnswer)
        ? question.correctAnswer[0]
        : question.correctAnswer;
      handleSpeakText(textToSpeak, false);
    } else {
      handlePlayAudio();
    }
  };

  const playSlowAudio = () => {
    if (useSpeechSynthesis) {
      const textToSpeak = Array.isArray(question.correctAnswer)
        ? question.correctAnswer[0]
        : question.correctAnswer;
      handleSpeakText(textToSpeak, true);
    } else {
      handlePlaySlow();
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
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-8"
        >
          Type what you hear
        </motion.h2>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Main Play Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playAudio}
            className="w-32 h-32 rounded-full bg-duo-blue hover:bg-duo-blue-hover flex items-center justify-center shadow-xl transition-all"
          >
            <Volume2 className="w-16 h-16 text-white" />
          </motion.button>

          {/* Slow Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playSlowAudio}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-all shadow-sm"
          >
            <VolumeX className="w-5 h-5" />
            <span>SLOW</span>
          </motion.button>

          {/* Hint */}
          {!hasPlayedAudio && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm text-gray-500 mt-2"
            >
              Click the speaker icon to hear the phrase
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Input Field */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`relative ${
            isSubmitted
              ? isCorrect
                ? 'ring-2 ring-duo-green rounded-2xl'
                : 'ring-2 ring-duo-red rounded-2xl'
              : ''
          }`}
        >
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isSubmitted}
            placeholder="Type your answer..."
            className={`w-full px-6 py-5 text-xl rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-duo-blue ${
              isSubmitted
                ? isCorrect
                  ? 'bg-green-50 border-duo-green text-duo-green-dark'
                  : 'bg-red-50 border-duo-red text-duo-red-dark'
                : 'bg-white border-gray-300 focus:border-duo-blue'
            } ${isSubmitted ? 'cursor-default' : ''}`}
            autoFocus
          />

          {/* Input Icon */}
          {isSubmitted && (
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
              {isCorrect ? (
                <Check className="w-7 h-7 text-duo-green" />
              ) : (
                <X className="w-7 h-7 text-duo-red" />
              )}
            </div>
          )}
        </motion.div>

        {/* Hint Text */}
        {!isSubmitted && userInput.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mt-3 text-center"
          >
            Listen carefully and type exactly what you hear
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleSubmit}
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
              <p className="text-sm font-normal text-gray-700 mb-2">
                Correct answer: {Array.isArray(question.correctAnswer)
                  ? question.correctAnswer[0]
                  : question.correctAnswer}
              </p>
              <button
                onClick={playAudio}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-duo-blue hover:bg-gray-50 transition-colors text-sm font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                Listen again
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ListenAndTypeQuestion;
