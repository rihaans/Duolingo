import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Volume2, Globe, Shield, Trash2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TopBar from '../components/Dashboard/TopBar';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    emailUpdates: false,
    weeklyReport: true,
    language: 'en',
    autoplayAudio: true,
  });

  const [loading, setLoading] = useState(false);

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully! ✓');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone!'
    );
    if (confirmed) {
      toast.error('Account deletion is not available in demo mode');
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
          <span className="font-semibold">Back</span>
        </button>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-duo-blue" />
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            </div>

            <div className="space-y-4">
              <ToggleSetting
                label="Push Notifications"
                description="Receive reminders to practice"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <ToggleSetting
                label="Email Updates"
                description="Get weekly progress emails"
                checked={settings.emailUpdates}
                onChange={() => handleToggle('emailUpdates')}
              />
              <ToggleSetting
                label="Weekly Report"
                description="Receive your weekly learning report"
                checked={settings.weeklyReport}
                onChange={() => handleToggle('weeklyReport')}
              />
            </div>
          </motion.div>

          {/* Sound & Audio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Volume2 className="w-6 h-6 text-duo-purple" />
              <h2 className="text-xl font-bold text-gray-800">Sound & Audio</h2>
            </div>

            <div className="space-y-4">
              <ToggleSetting
                label="Sound Effects"
                description="Play sounds for correct/incorrect answers"
                checked={settings.soundEffects}
                onChange={() => handleToggle('soundEffects')}
              />
              <ToggleSetting
                label="Autoplay Audio"
                description="Automatically play audio in listening exercises"
                checked={settings.autoplayAudio}
                onChange={() => handleToggle('autoplayAudio')}
              />
            </div>
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-duo-green" />
              <h2 className="text-xl font-bold text-gray-800">App Language</h2>
            </div>

            <select
              value={settings.language}
              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-duo-blue focus:outline-none transition-colors font-medium"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-800">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/change-password')}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors font-medium text-gray-700"
              >
                Change Password
              </button>
              <button
                onClick={() => toast('Privacy settings coming soon!')}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors font-medium text-gray-700"
              >
                Privacy Settings
              </button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-800">Danger Zone</h2>
            </div>

            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
            >
              Delete Account
            </button>
            <p className="text-sm text-gray-500 mt-2">
              This action is permanent and cannot be undone
            </p>
          </motion.div>

          {/* Save Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={handleSave}
            disabled={loading}
            className="w-full py-4 bg-duo-green text-white font-bold text-lg rounded-2xl hover:bg-duo-green-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save All Settings
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Toggle Setting Component
interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
          checked ? 'bg-duo-green' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsPage;
