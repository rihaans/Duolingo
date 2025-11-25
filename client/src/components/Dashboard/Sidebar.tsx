import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/learn', icon: Home, label: 'Learn', color: 'text-duo-green' },
    { to: '/practice', icon: Dumbbell, label: 'Practice', color: 'text-duo-purple' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard', color: 'text-yellow-500' },
    { to: '/profile', icon: User, label: 'Profile', color: 'text-duo-blue' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-20 lg:w-64 bg-white border-r border-gray-200 flex-col fixed left-0 top-0 h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-duo-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <h1 className="hidden lg:block text-2xl font-bold text-duo-green">Duolingo</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                    isActive
                      ? 'bg-duo-blue text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-6 h-6 ${isActive ? 'text-white' : item.color}`} />
                    <span className="hidden lg:block">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center lg:text-left">
            <p className="hidden lg:block text-xs text-gray-500">
              Made with ❤️ for learning
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex justify-around items-center px-4 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? 'text-duo-blue' : 'text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`relative ${isActive ? 'scale-110' : ''}`}
                  >
                    <item.icon className={`w-6 h-6 ${isActive ? item.color : ''}`} />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-duo-blue rounded-full"
                      />
                    )}
                  </motion.div>
                  <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
