import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Skill } from '../../types';

interface SkillModalProps {
  skill: Skill;
  onClose: () => void;
}

const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose }) => {
  const navigate = useNavigate();

  const completedLessons = skill.lessonsCompleted?.length || 0;
  const totalLessons = skill.lessons.length;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleStartLesson = () => {
    // Find the first incomplete lesson
    const nextLesson = skill.lessons.find(
      (lesson) => !skill.lessonsCompleted?.includes(lesson.id)
    );

    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    } else {
      // All lessons completed, start first one for practice
      navigate(`/lesson/${skill.lessons[0].id}`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black bg-opacity-50"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-5xl">{skill.icon}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{skill.title}</h2>
            <p className="text-blue-100">{skill.description}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-700">Progress</span>
                <span className="text-sm font-bold text-blue-600">
                  {completedLessons} / {totalLessons} lessons
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                />
              </div>
            </div>

            {/* Level */}
            {skill.userLevel !== undefined && (
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Skill Level</p>
                    <p className="text-xl font-bold text-purple-600">
                      Level {skill.userLevel}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Lessons list */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lessons
              </h3>
              <div className="space-y-2">
                {skill.lessons.map((lesson, index) => {
                  const isCompleted = skill.lessonsCompleted?.includes(lesson.id);
                  const isNext =
                    !isCompleted &&
                    (index === 0 ||
                      skill.lessonsCompleted?.includes(skill.lessons[index - 1].id));

                  return (
                    <div
                      key={lesson.id}
                      className={`
                        p-4 rounded-xl border-2 flex items-center justify-between
                        ${
                          isCompleted
                            ? 'bg-green-50 border-green-200'
                            : isNext
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          w-10 h-10 rounded-full flex items-center justify-center font-bold
                          ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isNext
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }
                        `}
                        >
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <div>
                          <p
                            className={`font-bold ${
                              isCompleted
                                ? 'text-green-800'
                                : isNext
                                ? 'text-blue-800'
                                : 'text-gray-600'
                            }`}
                          >
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {lesson.questions.length} questions
                          </p>
                        </div>
                      </div>
                      {isCompleted && (
                        <span className="text-2xl">🎉</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={handleStartLesson}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              {completedLessons === totalLessons ? 'Practice Again' : 'Start Lesson'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SkillModal;
