import React, { useState, useRef, useEffect } from 'react';
import { Bell, LogOut, User as UserIcon, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DefaultAvatar from '../UI/DefaultAvatar';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNotifications = () => {
    toast('No new notifications! 🔔', { icon: '📬' });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully! 👋');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: User Info with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.displayName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <DefaultAvatar size="small" className="ring-2 ring-white" />
            )}
            <div className="text-left">
              <h2 className="font-bold text-gray-800">{user.displayName}</h2>
              <p className="text-xs text-gray-500">Level {user.level}</p>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border-2 border-gray-100 py-2 z-50">
              <button
                onClick={() => {
                  navigate('/profile');
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 font-medium"
              >
                <UserIcon className="w-5 h-5 text-blue-500" />
                View Profile
              </button>
              <button
                onClick={() => {
                  navigate('/settings');
                  setShowUserMenu(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 font-medium"
              >
                <Settings className="w-5 h-5 text-gray-500" />
                Settings
              </button>
              <div className="border-t border-gray-100 my-2"></div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Right: Streak, Hearts, Notifications */}
        <div className="flex items-center gap-6">
          {/* Streak */}
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl border-2 border-orange-200">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs text-gray-600">Streak</p>
              <p className="font-bold text-orange-600">{user.currentStreak}</p>
            </div>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border-2 border-red-200">
            <span className="text-2xl">❤️</span>
            <div>
              <p className="text-xs text-gray-600">Hearts</p>
              <p className="font-bold text-red-600">{user.hearts}</p>
            </div>
          </div>

          {/* Notifications */}
          <button
            onClick={handleNotifications}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
