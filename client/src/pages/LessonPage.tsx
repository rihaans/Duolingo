import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LessonContainer from '../components/Lesson/LessonContainer';
import { lessonService } from '../services/lessonService';
import { Lesson } from '../types';
import toast from 'react-hot-toast';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPracticeMode = searchParams.get('practice') === 'true';
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) {
      navigate('/learn');
      return;
    }

    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedLesson = await lessonService.getLesson(lessonId!);
      setLesson(fetchedLesson);
    } catch (err: any) {
      console.error('Error fetching lesson:', err);
      setError(err.message || 'Failed to load lesson');
      toast.error('Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = () => {
    navigate('/learn');
  };

  const handleLessonExit = () => {
    navigate('/learn');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-duo-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md"
        >
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Lesson not found'}
          </p>
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3 bg-duo-green text-white font-bold rounded-xl hover:bg-duo-green-hover transition-colors"
          >
            Back to Learning Path
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <LessonContainer
        lesson={lesson}
        onComplete={handleLessonComplete}
        onExit={handleLessonExit}
        isPracticeMode={isPracticeMode}
      />
    </div>
  );
};

export default LessonPage;
