import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Plane,
  Brain,
  Users,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

interface OnboardingData {
  learningLanguage: string;
  age: number | null;
  learningGoal: string;
  dailyGoal: number;
  email: string;
  username: string;
  password: string;
  wantsPlacementTest: boolean;
}

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>({
    learningLanguage: '',
    age: null,
    learningGoal: '',
    dailyGoal: 100,
    email: '',
    username: '',
    password: '',
    wantsPlacementTest: false,
  });

  const learningGoals = [
    { id: 'school', label: 'For school', icon: GraduationCap },
    { id: 'work', label: 'For work', icon: Briefcase },
    { id: 'travel', label: 'For travel', icon: Plane },
    { id: 'brain', label: 'Brain training', icon: Brain },
    { id: 'culture', label: 'Culture & family', icon: Users },
    { id: 'other', label: 'Other', icon: MessageSquare },
  ];

  const dailyGoals = [
    { value: 50, label: 'Casual', time: '5 min/day', description: 'Light practice' },
    { value: 100, label: 'Regular', time: '10 min/day', description: 'Recommended' },
    { value: 150, label: 'Serious', time: '15 min/day', description: 'Build habits' },
    { value: 200, label: 'Intense', time: '20 min/day', description: 'Fast progress' },
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      await signup({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        learningLanguage: formData.learningLanguage || 'spanish',
        dailyGoal: formData.dailyGoal,
      });
      toast.success('Welcome to Duolingo! 🎉');
      navigate('/learn');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    // Step 0: Welcome
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="mb-8">
        <div className="text-8xl mb-6">🦉</div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Duolingo!
        </h1>
        <p className="text-xl text-gray-600">
          The free, fun, and effective way to learn Spanish!
        </p>
      </div>
      <button
        onClick={handleNext}
        className="w-full py-4 bg-duo-green text-white font-bold text-lg rounded-2xl hover:bg-duo-green-hover transition-all shadow-lg"
      >
        GET STARTED
      </button>
      <button
        onClick={() => navigate('/login')}
        className="w-full mt-4 text-duo-blue font-semibold hover:underline"
      >
        I Already Have an Account
      </button>
    </motion.div>,

    // Step 1: Choose Language
    <motion.div
      key="language"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        I want to learn...
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Choose a language to start learning
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { id: 'spanish', name: 'Spanish', flag: '🇪🇸', available: true },
          { id: 'french', name: 'French', flag: '🇫🇷', available: false },
          { id: 'german', name: 'German', flag: '🇩🇪', available: false },
          { id: 'italian', name: 'Italian', flag: '🇮🇹', available: false },
          { id: 'portuguese', name: 'Portuguese', flag: '🇵🇹', available: false },
          { id: 'japanese', name: 'Japanese', flag: '🇯🇵', available: false },
        ].map((lang) => (
          <button
            key={lang.id}
            onClick={() => {
              if (lang.available) {
                setFormData({ ...formData, learningLanguage: lang.id });
                setTimeout(handleNext, 300);
              } else {
                toast('Coming soon! Only Spanish is available right now.', { icon: '🚧' });
              }
            }}
            className={`p-6 rounded-2xl border-2 transition-all ${
              lang.available
                ? formData.learningLanguage === lang.id
                  ? 'bg-duo-green text-white border-duo-green-dark'
                  : 'bg-white border-gray-300 hover:border-gray-400'
                : 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="text-4xl mb-2">{lang.flag}</div>
            <div className="font-bold">{lang.name}</div>
            {!lang.available && (
              <div className="text-xs mt-1 text-gray-500">Coming Soon</div>
            )}
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Age
    <motion.div
      key="age"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        How old are you?
      </h2>
      <input
        type="number"
        min="1"
        max="120"
        value={formData.age || ''}
        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
        placeholder="Enter your age"
        className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-2xl focus:border-duo-blue focus:outline-none mb-6"
      />
      <button
        onClick={handleNext}
        disabled={!formData.age || formData.age < 1}
        className={`w-full py-4 font-bold text-lg rounded-2xl transition-all ${
          formData.age && formData.age > 0
            ? 'bg-duo-green text-white hover:bg-duo-green-hover'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        CONTINUE
      </button>
    </motion.div>,

    // Step 2: Learning Goal
    <motion.div
      key="goal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Why are you learning Spanish?
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {learningGoals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => {
              setFormData({ ...formData, learningGoal: goal.id });
              setTimeout(handleNext, 300);
            }}
            className={`p-6 rounded-2xl border-2 transition-all ${
              formData.learningGoal === goal.id
                ? 'bg-duo-blue text-white border-duo-blue-dark'
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            <goal.icon className="w-10 h-10 mx-auto mb-3" />
            <div className="font-bold">{goal.label}</div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 3: Daily Goal
    <motion.div
      key="daily"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        How much time can you dedicate?
      </h2>
      <div className="space-y-4 mb-6">
        {dailyGoals.map((goal) => (
          <button
            key={goal.value}
            onClick={() => {
              setFormData({ ...formData, dailyGoal: goal.value });
              setTimeout(handleNext, 300);
            }}
            className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
              formData.dailyGoal === goal.value
                ? 'bg-duo-green text-white border-duo-green-dark'
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-lg mb-1">{goal.label}</div>
                <div className="text-sm opacity-90">{goal.time} • {goal.description}</div>
              </div>
              {formData.dailyGoal === goal.value && <Check className="w-6 h-6" />}
            </div>
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 4: Create Account
    <motion.div
      key="account"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create your account
      </h2>
      <div className="space-y-4 mb-6">
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-duo-blue focus:outline-none"
        />
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Username"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-duo-blue focus:outline-none"
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-duo-blue focus:outline-none"
        />
      </div>
      <button
        onClick={handleNext}
        disabled={!formData.email || !formData.username || !formData.password}
        className={`w-full py-4 font-bold text-lg rounded-2xl transition-all ${
          formData.email && formData.username && formData.password
            ? 'bg-duo-green text-white hover:bg-duo-green-hover'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        CONTINUE
      </button>
      <p className="text-xs text-gray-500 text-center mt-4">
        By continuing, you agree to Duolingo's Terms and Privacy Policy
      </p>
    </motion.div>,

    // Step 5: Placement Test
    <motion.div
      key="placement"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="text-6xl mb-6">📝</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Do you have any experience with Spanish?
      </h2>
      <p className="text-gray-600 mb-8">
        Take a quick test to skip what you already know
      </p>
      <button
        onClick={() => {
          setFormData({ ...formData, wantsPlacementTest: true });
          handleNext();
        }}
        className="w-full py-4 bg-duo-blue text-white font-bold text-lg rounded-2xl hover:bg-duo-blue-hover transition-all mb-4"
      >
        YES, TEST MY LEVEL
      </button>
      <button
        onClick={() => {
          setFormData({ ...formData, wantsPlacementTest: false });
          handleNext();
        }}
        className="w-full py-4 bg-white border-2 border-gray-300 font-bold text-lg rounded-2xl hover:border-gray-400 transition-all"
      >
        NO, START FROM SCRATCH
      </button>
    </motion.div>,

    // Step 6: Welcome Celebration
    <motion.div
      key="celebration"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="text-8xl mb-6">🎉</div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        You're all set!
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Let's start your Spanish learning journey!
      </p>
      <button
        onClick={handleComplete}
        disabled={loading}
        className="w-full py-4 bg-duo-green text-white font-bold text-lg rounded-2xl hover:bg-duo-green-hover transition-all shadow-lg disabled:opacity-50"
      >
        {loading ? 'CREATING ACCOUNT...' : 'START LEARNING'}
      </button>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        {currentStep > 0 && currentStep < 7 && (
          <div className="mb-8">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 7) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-duo-green"
              />
            </div>
          </div>
        )}

        {/* Back Button */}
        {currentStep > 0 && currentStep < 7 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {steps[currentStep]}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;
