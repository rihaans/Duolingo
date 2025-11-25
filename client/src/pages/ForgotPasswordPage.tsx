import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to send reset email
      await new Promise(resolve => setTimeout(resolve, 1500));

      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-duo-green-light to-duo-blue-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Login</span>
        </button>

        {!emailSent ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-duo-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-duo-blue" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600">
                No worries! Enter your email and we'll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue focus:outline-none transition-colors font-medium"
                  placeholder="your.email@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-duo-green text-white font-bold text-lg rounded-xl hover:bg-duo-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Check Your Email!
            </h2>
            <p className="text-gray-600 mb-2">
              We've sent password reset instructions to:
            </p>
            <p className="text-duo-blue font-bold mb-6">{email}</p>
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="text-duo-blue font-bold hover:underline"
              >
                try again
              </button>
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-duo-blue text-white font-bold rounded-xl hover:bg-duo-blue-hover transition-colors"
            >
              Back to Login
            </button>
          </motion.div>
        )}

        {/* Help text */}
        {!emailSent && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-duo-blue font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
