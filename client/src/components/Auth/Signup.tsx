import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

type LearningGoal = 'school' | 'work' | 'travel' | 'brain' | 'culture' | 'other';
type DailyGoal = 50 | 100 | 150 | 200;

interface SignupData {
  age: number;
  learningGoal: LearningGoal | null;
  dailyGoal: DailyGoal;
  email: string;
  username: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignupData>({
    age: 0,
    learningGoal: null,
    dailyGoal: 100,
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; username?: string; password?: string }>({});

  const learningGoals = [
    { id: 'school' as LearningGoal, label: 'For school', icon: '📚', color: 'bg-blue-500' },
    { id: 'work' as LearningGoal, label: 'For work', icon: '💼', color: 'bg-purple-500' },
    { id: 'travel' as LearningGoal, label: 'Travel & culture', icon: '✈️', color: 'bg-pink-500' },
    { id: 'brain' as LearningGoal, label: 'Brain training', icon: '🧠', color: 'bg-indigo-500' },
    { id: 'culture' as LearningGoal, label: 'Culture & family', icon: '👨‍👩‍👧', color: 'bg-orange-500' },
    { id: 'other' as LearningGoal, label: 'Other', icon: '✨', color: 'bg-teal-500' },
  ];

  const dailyGoals = [
    { xp: 50 as DailyGoal, label: 'Casual', description: '5 min/day', icon: '☕' },
    { xp: 100 as DailyGoal, label: 'Regular', description: '10 min/day', icon: '📖' },
    { xp: 150 as DailyGoal, label: 'Serious', description: '15 min/day', icon: '🔥' },
    { xp: 200 as DailyGoal, label: 'Intense', description: '20 min/day', icon: '💪' },
  ];

  const validateStep5 = () => {
    const newErrors: { email?: string; username?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 2 && formData.age === 0) {
      toast.error('Please enter your age');
      return;
    }
    if (currentStep === 3 && !formData.learningGoal) {
      toast.error('Please select a learning goal');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep5()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        age: formData.age,
        learningGoal: formData.learningGoal,
        dailyGoal: formData.dailyGoal,
        displayName: formData.username,
        learningLanguage: 'spanish', // Default language
      });
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="progress-bar h-3">
            <motion.div
              className="progress-fill"
              initial={{ width: '20%' }}
              animate={{ width: `${(currentStep / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100"
          >
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl"
                >
                  <span className="text-7xl">🦉</span>
                </motion.div>
                <div>
                  <h1 className="text-5xl font-black text-gray-800 mb-4">
                    The free, fun, and effective way to learn a language!
                  </h1>
                  <p className="text-xl text-gray-600">
                    Join millions of learners around the world
                  </p>
                </div>
                <motion.button
                  onClick={handleNext}
                  className="btn-duo-primary text-2xl py-6 px-12"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <p className="text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-500 font-bold hover:text-blue-600">
                    Log In
                  </Link>
                </p>
              </div>
            )}

            {/* Step 2: Age */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-7xl mb-6"
                  >
                    🎂
                  </motion.div>
                  <h2 className="text-4xl font-black text-gray-800 mb-4">How old are you?</h2>
                  <p className="text-lg text-gray-600">This helps us personalize your experience</p>
                </div>
                <div className="max-w-xs mx-auto">
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    className="input-duo text-center text-3xl font-bold"
                    placeholder="Enter age"
                    autoFocus
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={handleBack}
                    className="btn-duo-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="btn-duo-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 3: Learning Goal */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-7xl mb-6"
                  >
                    🎯
                  </motion.div>
                  <h2 className="text-4xl font-black text-gray-800 mb-4">Why are you learning?</h2>
                  <p className="text-lg text-gray-600">Choose your main goal</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {learningGoals.map((goal) => (
                    <motion.button
                      key={goal.id}
                      onClick={() => setFormData({ ...formData, learningGoal: goal.id })}
                      className={`p-6 rounded-2xl border-4 transition-all ${
                        formData.learningGoal === goal.id
                          ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      whileHover={{ scale: formData.learningGoal === goal.id ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-5xl mb-3">{goal.icon}</div>
                      <div className="text-lg font-bold text-gray-800">{goal.label}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={handleBack}
                    className="btn-duo-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="btn-duo-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 4: Daily Goal */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-7xl mb-6"
                  >
                    🔥
                  </motion.div>
                  <h2 className="text-4xl font-black text-gray-800 mb-4">Choose your daily goal</h2>
                  <p className="text-lg text-gray-600">You can always change this later</p>
                </div>
                <div className="space-y-4">
                  {dailyGoals.map((goal) => (
                    <motion.button
                      key={goal.xp}
                      onClick={() => setFormData({ ...formData, dailyGoal: goal.xp })}
                      className={`w-full p-6 rounded-2xl border-4 transition-all flex items-center gap-6 ${
                        formData.dailyGoal === goal.xp
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-5xl">{goal.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="text-2xl font-black text-gray-800">{goal.label}</div>
                        <div className="text-lg text-gray-600">{goal.description}</div>
                      </div>
                      <div className="text-2xl font-black text-green-600">{goal.xp} XP</div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={handleBack}
                    className="btn-duo-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className="btn-duo-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 5: Create Account */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-7xl mb-6"
                  >
                    🎉
                  </motion.div>
                  <h2 className="text-4xl font-black text-gray-800 mb-4">Create your account</h2>
                  <p className="text-lg text-gray-600">One last step to get started!</p>
                </div>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`input-duo ${errors.email ? 'error' : ''}`}
                      placeholder="your.email@example.com"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 font-semibold">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({ ...formData, username: e.target.value });
                        if (errors.username) setErrors({ ...errors, username: undefined });
                      }}
                      className={`input-duo ${errors.username ? 'error' : ''}`}
                      placeholder="Choose a username"
                      disabled={isLoading}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-2 font-semibold">{errors.username}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      className={`input-duo ${errors.password ? 'error' : ''}`}
                      placeholder="Create a password (min 6 characters)"
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2 font-semibold">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={handleBack}
                    disabled={isLoading}
                    className="btn-duo-secondary"
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn-duo-primary"
                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Signup;
