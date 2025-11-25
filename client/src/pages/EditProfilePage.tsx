import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/Dashboard/TopBar';
import DefaultAvatar from '../components/UI/DefaultAvatar';
import toast from 'react-hot-toast';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call - in real app, call backend API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user context
      if (user) {
        updateUser({
          ...user,
          displayName: formData.displayName,
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
        });
      }

      toast.success('Profile updated successfully! 🎉');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Profile</span>
        </button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100"
        >
          {/* Avatar Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                />
              ) : (
                <DefaultAvatar size="large" className="ring-4 ring-white shadow-lg" />
              )}
              <button
                type="button"
                onClick={() => toast('Photo upload coming soon! 📸')}
                className="absolute bottom-0 right-0 w-10 h-10 bg-duo-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-duo-blue-hover transition-colors"
              >
                <Upload className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Click the button to upload a new photo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-bold text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue focus:outline-none transition-colors font-medium"
                placeholder="Your display name"
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue focus:outline-none transition-colors font-medium"
                placeholder="@username"
              />
              <p className="mt-1 text-xs text-gray-500">Your unique username</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue focus:outline-none transition-colors font-medium"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-bold text-gray-700 mb-2">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue focus:outline-none transition-colors font-medium resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-duo-green text-white font-bold rounded-xl hover:bg-duo-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditProfilePage;
