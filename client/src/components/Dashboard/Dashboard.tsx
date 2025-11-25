import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, PlayCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { Course, Skill, Lesson } from '../../types';
import TopBar from './TopBar';
import DailyGoalWidget from './DailyGoalWidget';
import LearningPath from './LearningPath';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourse();
  }, [user]);

  const loadCourse = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const courseData = await courseService.getCourse(user.learningLanguage);
      setCourse(courseData);
    } catch (err) {
      console.error('Failed to load course:', err);
      setError('Failed to load course. Please try again.');
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const findNextLesson = (): { lesson: Lesson; skill: Skill } | null => {
    if (!course) return null;

    // Iterate through units and skills to find the next available lesson
    for (const unit of course.units) {
      for (const skill of unit.skills) {
        if (!skill.isUnlocked) continue;

        // Find the first incomplete lesson in this skill
        const nextLesson = skill.lessons.find(
          (lesson) => !skill.lessonsCompleted?.includes(lesson.id)
        );

        if (nextLesson) {
          return { lesson: nextLesson, skill };
        }
      }
    }

    // If all lessons are completed, return the first lesson of the first skill for practice
    const firstSkill = course.units[0]?.skills[0];
    if (firstSkill && firstSkill.lessons.length > 0) {
      return { lesson: firstSkill.lessons[0], skill: firstSkill };
    }

    return null;
  };

  const handleContinue = () => {
    const next = findNextLesson();
    if (next) {
      navigate(`/lesson/${next.lesson.id}`);
    } else {
      toast.error('No lessons available');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadCourse}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const nextLesson = findNextLesson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar: Daily Goal Widget */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-8">
              <DailyGoalWidget />
            </div>
          </motion.div>

          {/* Center: Learning Path */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6"
          >
            {/* Course Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {course.title}
              </h1>
              <p className="text-gray-600">
                {course.units.length} units • {' '}
                {course.units.reduce((acc, unit) => acc + unit.skills.length, 0)} skills
              </p>
            </div>

            {/* Learning Path */}
            <LearningPath units={course.units} />

            {/* Continue Button - Fixed at bottom on mobile */}
            {nextLesson && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 left-6 right-6 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:mt-8 z-40"
              >
                <button
                  onClick={handleContinue}
                  className="w-full py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-2xl hover:from-green-600 hover:to-green-700 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
                >
                  <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  <span>CONTINUE</span>
                </button>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Next: {nextLesson.skill.title} - {nextLesson.lesson.title}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Sidebar: Stats and Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-8 space-y-6">
              {/* XP Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total XP</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {user?.totalXP || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekly XP</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {user?.weeklyXP || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Level</span>
                    <span className="text-2xl font-bold text-green-600">
                      {user?.level || 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Streak Card */}
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-md p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Streak</h3>
                  <span className="text-4xl">🔥</span>
                </div>
                <p className="text-5xl font-bold mb-2">{user?.currentStreak || 0}</p>
                <p className="text-orange-100">
                  {user?.currentStreak === 1 ? 'day' : 'days'} in a row
                </p>
                <div className="mt-4 pt-4 border-t border-orange-300">
                  <p className="text-sm text-orange-100">Longest streak</p>
                  <p className="text-2xl font-bold">{user?.longestStreak || 0} days</p>
                </div>
              </div>

              {/* Motivation Card */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-md p-6 text-white">
                <h3 className="text-lg font-bold mb-3">Keep it up!</h3>
                <p className="text-purple-100">
                  You're doing amazing! Keep practicing every day to maintain your streak.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
