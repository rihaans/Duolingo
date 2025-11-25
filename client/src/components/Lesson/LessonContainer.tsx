import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson, LessonCompleteResponse } from '../../types';
import LessonHeader from './LessonHeader';
import QuestionRenderer from './QuestionRenderer';
import AnswerFeedback from './AnswerFeedback';
import LessonComplete from './LessonComplete';
import LessonFailed from './LessonFailed';
import { lessonService } from '../../services/lessonService';
import { useAudio } from '../../hooks/useAudio';

interface LessonContainerProps {
  lesson: Lesson;
  initialHearts?: number;
  isPracticeMode?: boolean;
  onComplete?: () => void;
  onExit?: () => void;
}

type LessonState = 'in-progress' | 'showing-feedback' | 'complete' | 'failed';

const LessonContainer: React.FC<LessonContainerProps> = ({
  lesson,
  initialHearts = 5,
  isPracticeMode = false,
  onComplete,
  onExit,
}) => {
  const navigate = useNavigate();
  const { playCorrect, playIncorrect, playHeartBreak, playLessonComplete } = useAudio();

  // Practice mode: unlimited hearts (set to 999), reduced XP
  const effectiveHearts = isPracticeMode ? 999 : initialHearts;
  const xpMultiplier = isPracticeMode ? 0.5 : 1; // 5 XP in practice, 10 XP in normal mode

  // Safety check for questions
  if (!lesson.questions || lesson.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No questions available</h2>
          <p className="text-gray-600 mb-6">This lesson doesn't have any questions yet.</p>
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3 bg-duo-green text-white font-bold rounded-xl hover:bg-duo-green-hover"
          >
            Back to Learning Path
          </button>
        </div>
      </div>
    );
  }

  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hearts, setHearts] = useState(effectiveHearts);
  const [lessonState, setLessonState] = useState<LessonState>('in-progress');
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [lastUserAnswer, setLastUserAnswer] = useState('');
  const [xpEarned, setXpEarned] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [lessonResult, setLessonResult] = useState<LessonCompleteResponse | null>(null);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Handle answer submission
  const handleAnswer = (isCorrect: boolean, userAnswer: string) => {
    setLastAnswerCorrect(isCorrect);
    setLastUserAnswer(userAnswer);
    setShowFeedback(true);
    setLessonState('showing-feedback');

    if (isCorrect) {
      // Play correct sound
      playCorrect();

      // Award XP for correct answer (reduced in practice mode)
      const baseXP = currentQuestion.xpReward || 10;
      const questionXP = Math.round(baseXP * xpMultiplier);
      setXpEarned((prev) => prev + questionXP);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      // Play incorrect sound
      playIncorrect();

      // In practice mode, don't lose hearts
      if (!isPracticeMode) {
        // Lose a heart for incorrect answer
        const newHearts = hearts - 1;
        setHearts(newHearts);

        // Play heart break sound if losing a heart
        if (newHearts >= 0) {
          playHeartBreak();
        }

        // Check if out of hearts
        if (newHearts <= 0) {
          setLessonState('failed');
        }
      }
    }
  };

  // Handle continue after feedback
  const handleContinue = async () => {
    setShowFeedback(false);

    // Check if lesson is complete
    if (isLastQuestion) {
      // Play lesson complete sound
      playLessonComplete();

      // Submit lesson completion to backend
      try {
        const result = await lessonService.completeLesson(lesson.id, {
          correctAnswers,
          totalQuestions,
          isPractice: isPracticeMode,
        });
        setLessonResult(result);
        setLessonState('complete');
      } catch (error) {
        console.error('Error completing lesson:', error);
        // Even if API fails, show completion screen with local data
        const mockResult: LessonCompleteResponse = {
          xpEarned,
          accuracy: correctAnswers / totalQuestions,
          isPerfect: correctAnswers === totalQuestions,
          leveledUp: false,
          newLevel: 1,
          totalXP: xpEarned,
          streak: 1,
          newAchievements: [],
          dailyGoalProgress: {
            current: xpEarned,
            goal: 50,
            completed: xpEarned >= 50,
          },
        };
        setLessonResult(mockResult);
        setLessonState('complete');
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setLessonState('in-progress');
    }
  };

  // Handle lesson close
  const handleClose = () => {
    navigate('/learn');
  };

  // Handle retry after failure
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setHearts(initialHearts);
    setLessonState('in-progress');
    setShowFeedback(false);
    setXpEarned(0);
    setCorrectAnswers(0);
  };

  // Handle go home
  const handleGoHome = () => {
    navigate('/learn');
  };

  // Handle completion continue
  const handleCompleteContinue = () => {
    navigate('/learn');
  };

  // Render based on lesson state
  if (lessonState === 'complete' && lessonResult) {
    return <LessonComplete result={lessonResult} onContinue={handleCompleteContinue} />;
  }

  if (lessonState === 'failed') {
    return <LessonFailed onRetry={handleRetry} onGoHome={handleGoHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Lesson Header */}
      <LessonHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        hearts={hearts}
        onClose={handleClose}
      />

      {/* Main Content Area */}
      <div className="pt-32 pb-40 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionRenderer
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Answer Feedback */}
      <AnswerFeedback
        isVisible={showFeedback}
        isCorrect={lastAnswerCorrect}
        correctAnswer={lastAnswerCorrect ? undefined : currentQuestion.correctAnswer}
        userAnswer={lastAnswerCorrect ? undefined : lastUserAnswer}
        onContinue={handleContinue}
      />

      {/* Skip Button - Optional */}
      {lessonState === 'in-progress' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <button
            onClick={handleContinue}
            className="text-duo-blue hover:text-duo-blue-hover font-bold text-sm underline"
          >
            Skip this question
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LessonContainer;
