import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowLeft, Target } from 'lucide-react';
import TopBar from '../components/Dashboard/TopBar';
import { courseService } from '../services/courseService';
import { Skill } from '../types';
import toast from 'react-hot-toast';

const PracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const course = await courseService.getCourse('spanish');
      const allSkills = course.units.flatMap(unit => unit.skills);
      // Only show unlocked skills with completed lessons
      const practiceableSkills = allSkills.filter(
        skill => skill.isUnlocked && (skill.lessonsCompleted?.length || 0) > 0
      );
      setSkills(practiceableSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load practice skills');
    } finally {
      setLoading(false);
    }
  };

  const handleStartPractice = (skillId: string) => {
    // Find the skill
    const skill = skills.find(s => s.id === skillId);
    if (!skill || !skill.lessons || skill.lessons.length === 0) {
      toast.error('No lessons available for practice');
      return;
    }

    // Get only completed lessons
    const completedLessons = skill.lessons.filter(lesson =>
      skill.lessonsCompleted?.includes(lesson.id)
    );

    if (completedLessons.length === 0) {
      toast.error('Complete some lessons first to practice this skill');
      return;
    }

    // Select a random completed lesson for practice
    const randomLesson = completedLessons[Math.floor(Math.random() * completedLessons.length)];

    // Navigate to the lesson with practice mode (unlimited hearts, reduced XP)
    navigate(`/lesson/${randomLesson.id}?practice=true`);
    toast.success('Starting practice mode!', { icon: '💪' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-duo-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading practice options...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50"
    >
      <TopBar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/learn')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Learning Path</span>
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-duo-purple rounded-full flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">Practice</h1>
              <p className="text-gray-600">Review and strengthen your skills</p>
            </div>
          </div>
        </div>

        {/* Practice Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-duo-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">How Practice Works</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• <span className="font-semibold">Unlimited hearts</span> - Practice without pressure</li>
                <li>• <span className="font-semibold">Reduced XP</span> - Earn 5 XP per correct answer instead of 10</li>
                <li>• <span className="font-semibold">Review mistakes</span> - Focus on questions you got wrong</li>
                <li>• <span className="font-semibold">Strengthen skills</span> - Keep your skills fresh and strong</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Skills to Practice */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Choose a skill to practice</h2>
        </div>

        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-sm"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No skills to practice yet</h3>
            <p className="text-gray-600 mb-6">Complete some lessons first!</p>
            <button
              onClick={() => navigate('/learn')}
              className="px-6 py-3 bg-duo-green text-white font-bold rounded-xl hover:bg-duo-green-hover transition-colors"
            >
              Start Learning
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartPractice(skill.id)}
                className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-duo-blue cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-3xl">{skill.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{skill.title}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {skill.lessonsCompleted?.length || 0} lesson{(skill.lessonsCompleted?.length || 0) !== 1 ? 's' : ''} completed
                  </span>
                  <span className="text-duo-purple font-semibold">Practice →</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PracticePage;
